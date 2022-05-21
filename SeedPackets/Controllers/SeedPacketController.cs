using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SeedPackets.DataAccess;
using SeedPackets.Models;

namespace SeedPackets.Controllers
{
    [Route("Api/[controller]/")]
    [ApiController]
    public class SeedPacketController : Controller
    {
        private readonly ISeedPacketRepository _seedpackrepo;

        public SeedPacketController(ISeedPacketRepository seedPacketRepository)
        {
            _seedpackrepo = seedPacketRepository;
        }

        // GET: Seed Packets by Uid
        [HttpGet("user/{uid}")]
        public ActionResult GetSeedPacketsByUid(string uid)
        {
            List<SeedPacket> packets = _seedpackrepo.GetSeedPacketsByUid(uid);
            if (packets == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(packets);
            }
        }

        // GET: Seed Packet by Id
        [HttpGet("{id}")]
        public ActionResult GetSeedPacketById(int id)
        {
            SeedPacket packet = _seedpackrepo.GetSeedPacketById(id);
            if (packet == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(packet);
            }
        }

        // POST: Seed Packet
        [HttpPost]
        public ActionResult AddSeedPacket(SeedPacket packet)
        {
            if (packet == null)
            {
                return NotFound();
                Console.WriteLine("Upload Failed");
            }
            else
            {
                _seedpackrepo.AddPacket(packet);
                return Ok(packet);
            }

        }

        // PATCH: Seed Packet
        [HttpPatch("{id}")]
        public ActionResult UpdateSeedPacket(int id, SeedPacket packet)
        {
            SeedPacket seedPacket = _seedpackrepo.GetSeedPacketById(id);

            if (seedPacket != null)
            {
                _seedpackrepo.UpdatePacket(packet);
                return Ok(packet);
            }
            else
            {
                return BadRequest(packet);
            }
        }

        // DELETE: Seed Packet
        [HttpDelete("{id}")]
        public ActionResult DeletePacket(int id)
        {
            try
            {
                _seedpackrepo.DeletePacket(id);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest("DELETE FAILED");
            }
        }
    }
}
