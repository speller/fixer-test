using System;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using FixerTest.Data;
using FixerTest.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FixerTest.Controllers
{
    /**
     * Serve properties transaction data manipulation
     */
    public class PropertyTransactionController
    {
        private readonly ApplicationDbContext _dbContext;
        
        public PropertyTransactionController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // POST: /PropertyTransaction/ReadTransactions
        [HttpPost]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<JsonResult> ReadTransactions([FromBody] PropertyTransactionFilter filter)
        {
            await FetchRemoteDataIfNeeded(filter.From, filter.To, filter.PrefCode, filter.CityCode);
            var rows = _dbContext.PropertyTransactions.Where(t => t.Period >= filter.From && t.Period <= filter.To);
            return new JsonResult(rows); //OkObjectResult(rows.);
        }
        
        /**
         * Update local DB with remote data if requested period wider than local DB data
         */
        private async Task FetchRemoteDataIfNeeded(int currentFrom, int currentTo, int prefCode, int cityCode)
        {
            var maxPeriod = _dbContext.PropertyTransactions.Max(x => (int?)x.Period) ?? 0;            
            var minPeriod = _dbContext.PropertyTransactions.Min(x => (int?)x.Period) ?? 0;
            if (maxPeriod == 0 && minPeriod == 0)
            {
                // Initial load
                await FetchRemoteDataByPeriod(currentFrom, currentTo, prefCode, cityCode);
            }
            else
            {
                var tasks = new Task[0];
                if (currentFrom < minPeriod)
                {
                    int p = minPeriod % 10;
                    if (p == 1)
                    {
                        minPeriod = minPeriod - 10 + 3;
                    }
                    else
                    {
                        minPeriod--;
                    }
                    tasks.Append(FetchRemoteDataByPeriod(currentFrom, minPeriod, prefCode, cityCode));
                }

                if (currentTo > maxPeriod)
                {
                    var p = maxPeriod % 10;
                    if (p == 4)
                    {
                        maxPeriod = maxPeriod + 10 - 3;
                    }
                    else
                    {
                        maxPeriod++;
                    }
                    tasks.Append(FetchRemoteDataByPeriod(maxPeriod, currentTo, prefCode, cityCode));
                }
                
                if (tasks.Length > 0)
                {
                    await Task.WhenAll(tasks);
                }
            }
        }
        
        /**
         * Actually download data by the specified period
         */
        private async Task FetchRemoteDataByPeriod(int from, int to, int prefCode, int cityCode)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"http://www.land.mlit.go.jp/webland_english/api/TradeListSearch?from={from}&to={to}&area={prefCode}&city={cityCode}");
                response.EnsureSuccessStatusCode();

                var stringResult = await response.Content.ReadAsStringAsync();
                var rowsObj = JsonConvert.DeserializeObject(stringResult) as JObject;
                if ((string)rowsObj["status"] != "OK")
                {
                    throw new Exception("Invalid status");
                }
                var rows = (from r in rowsObj["data"]
                let match = Regex.Match((string) r["Period"], @"(\d)[^\n]+(\d{4})")
                select new PropertyTransaction
                {
                    Period = int.Parse(match.Groups[2].Value + match.Groups[1].Value),
                    PrefCode = prefCode,
                    PrefName = (string) r["Prefecture"],
                    CityCode = cityCode,
                    CityName = (string) r["Municipality"],
                    Area = (string) r["Area"],
                    BuildingYear = (string) r["BuildingYear"],
                    FloorPlan = (string) r["FloorPlan"],
                    NearestStation = (string) r["NearestStation"],
                    TradePrice = (decimal) r["TradePrice"],
                }).ToList();

                await _dbContext.PropertyTransactions.AddRangeAsync(rows);
                _dbContext.SaveChanges();
            }
        }
    }
}