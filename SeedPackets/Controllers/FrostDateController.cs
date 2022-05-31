using Microsoft.AspNetCore.Mvc;
using SeedPackets.DataAccess;
using SeedPackets.Models;

namespace SeedPackets.Controllers
{
    [Route("Api/[controller]/")]
    [ApiController]
    public class FrostDateController : Controller
    {
        private readonly IFrostDateRepository _frostDateRepo;

        public FrostDateController(IFrostDateRepository frostDateRepository)
        {
            _frostDateRepo = frostDateRepository;
        }

        // GET: FrostDate by Id
        [HttpGet("Id/{id}")]
        public ActionResult GetFrostDateById(int id)
        {
            FrostDate frostDate = _frostDateRepo.GetFrostDateById(id);
            if (frostDate == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(frostDate);
            }
        }

        //GET: FrostDate by Name
        [HttpGet("Name/{name}")]
        public ActionResult GetFrostDateByName(string name)
        {
            FrostDate frostDate = _frostDateRepo.GetFrostDateByCity(name);
            if (frostDate == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(frostDate);
            }
        }

        //GET: All FrostDates
        [HttpGet]
        public List<FrostDate> GetAllFrostDates()
        {
            return _frostDateRepo.GetAllFrostDates();
        }
    }
}
