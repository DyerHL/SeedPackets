using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SeedPackets.DataAccess;
using SeedPackets.Models;

namespace SeedPackets.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepo;

        public UserController(IUserRepository userRepository)
        {
            _userRepo = userRepository;
        }

        // GET an user by their Uid
        [HttpGet("{uid}")]
        public ActionResult GetUserByUid(string uid)
        {
            User user = _userRepo.GetUserByUid(uid);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }

        [HttpGet("Auth")]
        public async Task<IActionResult> UserAuth()
        {
            string uid = User.FindFirst(claim => claim.Type == "user_id").Value;
            bool userexists = _userRepo.UserExists(uid);
            if (!userexists)
            {
                User userFromToken = new User
                {
                    Name = User.Identity.Name,
                    Uid = uid,
                };

                _userRepo.AddUser(userFromToken);
                return Ok(userFromToken);
            }
            User existingUser = _userRepo.GetUserByUid(uid);
            return Ok(existingUser);
        }
    }
}
