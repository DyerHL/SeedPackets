using SeedPackets.Models;

namespace SeedPackets.DataAccess
{
    public interface IUserRepository
    {
        public bool UserExists(string uid);
        public User GetUserByUid(string uid);
        public void AddUser(User user);
    }
}
