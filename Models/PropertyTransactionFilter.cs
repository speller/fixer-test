namespace FixerTest.Models
{
    /**
     * Property transaction request filter data
     */
    public class PropertyTransactionFilter
    {
        public int From { get; set; }
        public int To { get; set; }
        public int PrefCode { get; set; }
        public int CityCode { get; set; }
    }
}