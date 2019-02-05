using System.ComponentModel.DataAnnotations;
using Toolbelt.ComponentModel.DataAnnotations.Schema;

namespace FixerTest.Models
{
    /**
     * Properties transaction data
     */
    public class PropertyTransaction
    {
        public PropertyTransaction(){}
        
        public PropertyTransaction(int id, int period, int prefCode, int cityCode, string nearestStation, decimal tradePrice, string floorPlan, string area, string buildingYear)
        {
            Id = id;
            Period = period;
            PrefCode = prefCode;
            CityCode = cityCode;
            NearestStation = nearestStation;
            TradePrice = tradePrice;
            FloorPlan = floorPlan;
            Area = area;
            BuildingYear = buildingYear;
        }

        public int Id { get; set; }

        [Index(IsUnique = false)]
        public int Period { get; set; }
        
        [Index(IsUnique = false)]
        public int PrefCode { get; set; }
        
        public string PrefName { get; set; }

        [Index(IsUnique = false)]
        public int CityCode { get; set; }
        
        public string CityName { get; set; }
        
        [MaxLength(30)]
        public string NearestStation { get; set; }
        
        public decimal TradePrice { get; set; }
        
        [MaxLength(20)]
        public string FloorPlan { get; set; }
        
        [MaxLength(20)]
        public string Area { get; set; }
        
        [MaxLength(20)]
        public string BuildingYear { get; set; }
        
    }
}