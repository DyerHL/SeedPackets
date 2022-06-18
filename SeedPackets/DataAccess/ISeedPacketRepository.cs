using SeedPackets.Models;

namespace SeedPackets.DataAccess
{
    public interface ISeedPacketRepository
    {
        public void AddPacket(SeedPacket packet);
        public void UpdatePacket(SeedPacket packet);
        public List<SeedPacket> GetSeedPacketsByUid(string uid);
        public SeedPacket GetSeedPacketById(int id);
        public void DeletePacket(int id);
        public void UpdatePlanted(int id);
        public List<SeedPacket> GetSeedPacketsByUidAlpha(string uid);

        public List<SeedPacket> GetSeedPacketsOrderedByPlantingDate(string uid);

    }
}
