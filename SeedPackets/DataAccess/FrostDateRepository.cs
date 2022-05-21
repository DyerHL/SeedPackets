using Microsoft.Data.SqlClient;
using SeedPackets.Models;

namespace SeedPackets.DataAccess
{
    public class FrostDateRepository : IFrostDateRepository
    {
        private readonly IConfiguration _config;

        public FrostDateRepository(IConfiguration config)
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

        //Get Frost Date By Name
        public FrostDate GetFrostDateByCity(string city)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT [Name],
                                             AverageFrostDate,
                                             Id
                                       FROM FrostDate
                                       WHERE [Name] = @name  
                                       ";

                    cmd.Parameters.AddWithValue("@name", city);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        FrostDate frost = new FrostDate
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            AverageFrostDate = reader.GetDateTime(reader.GetOrdinal("AverageFrostDate")),
                        };

                        reader.Close();
                        return frost;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        //Get Frost Date By Id
        public FrostDate GetFrostDateById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT [Name],
                                             AverageFrostDate,
                                             Id
                                       FROM FrostDate
                                       WHERE id = @id  
                                       ";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        FrostDate frost = new FrostDate
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            AverageFrostDate = reader.GetDateTime(reader.GetOrdinal("AverageFrostDate")),
                        };

                        reader.Close();
                        return frost;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
    }
}
