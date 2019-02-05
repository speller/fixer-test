namespace FixerTest.Models
{
    /**
     * Remote API property transaction response model
     */
    public class PropertyTransactionRemote
    {
        public int Period { get; set; }
        public int Region { get; set; }
        public string Prefecture { get; set; }
        public int MunicipalityCode { get; set; }
        public string Municipality { get; set; }
        public string DistrictName { get; set; }
        public string NearestStation { get; set; }
        public decimal TradePrice { get; set; }
        public string FloorPlan { get; set; }
        public string Area { get; set; }
        public string BuildingYear { get; set; }
    }
}