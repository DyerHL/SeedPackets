using Microsoft.Data.SqlClient;
using SeedPackets.Models;

namespace SeedPackets.DataAccess
{
    public class SeedPacketRepository : ISeedPacketRepository
    {
        private readonly IConfiguration _config;

        public SeedPacketRepository(IConfiguration config)
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

        // Add Seed Packet
        public void AddPacket(SeedPacket packet)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO SeedPackets 
                                                (Name,
                                                ImgUrl,
                                                WeeksBeforeFrost,
                                                HarvestDays,
                                                PlantingDate,
                                                GermReq,
                                                Spacing,
                                                Height,
                                                Notes,
                                                UserUid)
                                        OUTPUT Inserted.Id
                                        VALUES (@name, @imgUrl, @weeksBeforeFrost, @harvestDays, @plantingDate, @germReq, @spacing, @height, @notes, @userUid)";

                    cmd.Parameters.AddWithValue("@name", packet.Name);
                    cmd.Parameters.AddWithValue("@imgUrl", packet.ImgUrl);
                    cmd.Parameters.AddWithValue("@weeksBeforeFrost", packet.WeeksBeforeFrost);
                    cmd.Parameters.AddWithValue("@harvestDays", packet.HarvestDays);
                    cmd.Parameters.AddWithValue("@plantingDate", packet.PlantingDate);
                    cmd.Parameters.AddWithValue("@germReq", packet.GermReq);
                    cmd.Parameters.AddWithValue("@spacing", packet.Spacing);
                    cmd.Parameters.AddWithValue("@height", packet.Height);
                    cmd.Parameters.AddWithValue("@notes", packet.Notes);
                    cmd.Parameters.AddWithValue("@userUid", packet.UserUid);

                    int id = (int)cmd.ExecuteScalar();

                    packet.Id = id;
                }
            }
        }

        // Update Seed Packet
        public void UpdatePacket(SeedPacket packet)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Update SeedPackets
                                        SET
                                            Name = @name,
                                            ImgUrl = @imgUrl,
                                            WeeksBeforeFrost = @weeksBeforeFrost,
                                            HarvestDays = @harvestDays,
                                            PlantingDate = @plantingDate,
                                            GermReq = @germReq,
                                            Spacing = @spacing,
                                            Height = @height,
                                            Notes = @notes,
                                            UserUid = @userUid
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", packet.Name);
                    cmd.Parameters.AddWithValue("@imgUrl", packet.ImgUrl);
                    cmd.Parameters.AddWithValue("@weeksBeforeFrost", packet.WeeksBeforeFrost);
                    cmd.Parameters.AddWithValue("@harvestDays", packet.HarvestDays);
                    cmd.Parameters.AddWithValue("@plantingDate", packet.PlantingDate);
                    cmd.Parameters.AddWithValue("@germReq", packet.GermReq);
                    cmd.Parameters.AddWithValue("@spacing", packet.Spacing);
                    cmd.Parameters.AddWithValue("@height", packet.Height);
                    cmd.Parameters.AddWithValue("@notes", packet.Notes);
                    cmd.Parameters.AddWithValue("@userUid", packet.UserUid);
                    cmd.Parameters.AddWithValue("@id", packet.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Get Seed Packets by Uid
        public List<SeedPacket> GetSeedPacketsByUid(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT Name,
                                             ImgUrl,
                                             WeeksBeforeFrost,
                                             HarvestDays,
                                             PlantingDate,
                                             GermReq,
                                             Spacing,
                                             Height,
                                             Notes,
                                             Id,
                                             UserUid
                                       FROM SeedPackets
                                       WHERE UserUid = @userUid  
                                       ";

                    cmd.Parameters.AddWithValue("@userUid", uid);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<SeedPacket> packets = new List<SeedPacket>();

                    while (reader.Read())
                    {
                        SeedPacket packet = new SeedPacket
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImgUrl = reader.GetString(reader.GetOrdinal("ImgUrl")),
                            WeeksBeforeFrost = reader.GetInt32(reader.GetOrdinal("WeeksBeforeFrost")),
                            HarvestDays = reader.GetInt32(reader.GetOrdinal("HarvestDays")),
                            GermReq = reader.GetString(reader.GetOrdinal("GermReq")),
                            Spacing = reader.GetString(reader.GetOrdinal("Spacing")),
                            Height = reader.GetString(reader.GetOrdinal("Height")),
                            Notes = reader.GetString(reader.GetOrdinal("Notes")),
                            UserUid = reader.GetString(reader.GetOrdinal("UserUid"))
                        };

                        if (reader.IsDBNull(reader.GetOrdinal("PlantingDate")) == false)
                        {
                            packet.PlantingDate = reader.GetDateTime(reader.GetOrdinal("PlantingDate"));
                        }

                        packets.Add(packet);
                    }
                    reader.Close();
                    return packets;
                }
            }
        }

        // Get Single Seed Packet by Id
        public SeedPacket GetSeedPacketById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT Name,
                                             ImgUrl,
                                             WeeksBeforeFrost,
                                             HarvestDays,
                                             PlantingDate,
                                             GermReq,
                                             Spacing,
                                             Height,
                                             Notes,
                                             UserUid,
                                             Id
                                       FROM SeedPackets
                                       WHERE id = @id  
                                       ";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        SeedPacket packet = new SeedPacket
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImgUrl = reader.GetString(reader.GetOrdinal("ImgUrl")),
                            WeeksBeforeFrost = reader.GetInt32(reader.GetOrdinal("WeeksBeforeFrost")),
                            HarvestDays = reader.GetInt32(reader.GetOrdinal("HarvestDays")),
                            GermReq = reader.GetString(reader.GetOrdinal("GermReq")),
                            Spacing = reader.GetString(reader.GetOrdinal("Spacing")),
                            Height = reader.GetString(reader.GetOrdinal("Height")),
                            Notes = reader.GetString(reader.GetOrdinal("Notes")),
                            UserUid = reader.GetString(reader.GetOrdinal("UserUid"))
                        };

                        if (reader.IsDBNull(reader.GetOrdinal("PlantingDate")) == false)
                        {
                            packet.PlantingDate = reader.GetDateTime(reader.GetOrdinal("PlantingDate"));
                        }

                        reader.Close();
                        return packet;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        // Delete Seed Packet
        public void DeletePacket(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM SeedPackets
                                        WHERE Id = @id
                                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
