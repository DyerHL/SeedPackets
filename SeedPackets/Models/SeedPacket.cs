namespace SeedPackets.Models
{
    public class SeedPacket
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
        public int WeeksBeforeFrost { get; set; }
        public int HarvestDays { get; set; }
        public DateTime PlantingDate { get; set; }
        public string GermReq { get; set; }
        public string Spacing { get; set; }
        public string Height { get; set; }
        public string Notes { get; set; }
        public string UserUid { get; set; }

    }
}
