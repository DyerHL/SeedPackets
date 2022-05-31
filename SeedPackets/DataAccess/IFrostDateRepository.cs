using SeedPackets.Models;

namespace SeedPackets.DataAccess
{
    public interface IFrostDateRepository
    {
        public FrostDate GetFrostDateByCity(string city);
        public FrostDate GetFrostDateById(int id);
        public List<FrostDate> GetAllFrostDates();
    }
}
