using Microsoft.Data.SqlClient;
using SeedPackets.Models;

namespace SeedPackets.DataAccess
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        // User Exists
        public bool UserExists(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT Id,
                                             [Name],
					                         Uid,
					                         City,
                                             FrostDateId)
                                       FROM User
                                       WHERE Uid = @uid  
                                       ";

                    cmd.Parameters.AddWithValue("@uid", uid);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        return true;
                    }
                    else
                    {
                        reader.Close();
                        return false;
                    }
                }
            }
        }

        // Get User by Uid
        public User GetUserByUid(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT Id,
                                             [Name],
					                         Uid,
					                         City,
                                             FrostDateId
                                       FROM [User]
                                       WHERE Uid = @uid  
                                       ";

                    cmd.Parameters.AddWithValue("@uid", uid);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        User user = new User
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Uid = reader.GetString(reader.GetOrdinal("Uid"))
                        };

                        if (reader.IsDBNull(reader.GetOrdinal("FrostDateId")) == false)
                        {
                            user.FrostDateId = reader.GetInt32(reader.GetOrdinal("FrostDateId"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("City")) == false)
                        {
                            user.City = reader.GetString(reader.GetOrdinal("City"));
                        }

                        reader.Close();
                        return user;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        // Add User
        public void AddUser(User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO User 
                                                        ([Name],
					                                    Uid,
					                                    City,
                                                        FrostDateId)
                                        OUTPUT INSERTED.Id
                                        VALUES (@name, @uid, @city, @frostDateId)";

                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@uid", user.Uid);
                    cmd.Parameters.AddWithValue("@city", user.City);
                    cmd.Parameters.AddWithValue("@frostDateId", user.FrostDateId);

                    int id = (int)cmd.ExecuteScalar();

                    user.Id = id;
                }
            }
        }

    }
}
