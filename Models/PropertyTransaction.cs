using System.ComponentModel.DataAnnotations;

namespace FixerTest.Models
{
    /**
     * Properties transaction data
     */
    public class PropertyTransaction
    {
        public int Id { get; set; }
        
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