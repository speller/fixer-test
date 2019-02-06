using System.Threading.Tasks;
using FixerTest.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FixerTest.Controllers
{
    /**
     * Serve registration, login and logout ajax requests.
     */
    [EnableCors("AllowAllPolicy")]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthenticationController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // GET: /Authentication/GetLoginStatus
        [HttpGet]
        [AllowAnonymous]
        [Produces("application/json")]
        public IActionResult GetLoginStatus()
        {
            if (User.Identity.IsAuthenticated)
            {
                return new ObjectResult(new {success = true, email = User.Identity.Name});
            }
            else
            {
                return new ObjectResult(new { success = false, reason = "not authenticated" });
            }
        }

        // POST: /Authentication/Register
        [HttpPost]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<IActionResult> Register([FromBody] RegisterLoginRequest loginRequest)
        {
            var email = loginRequest.Email;
            var password = loginRequest.Password;
            
            if (User.Identity.IsAuthenticated)
            {
                return new ObjectResult(new {success = false, reason = "already logged in"});
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return new ObjectResult(new {success = false, reason = "already registered"});
            }
            else
            {
                user = new IdentityUser(email);
                user.Email = email;
                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, true);
                    return new ObjectResult(new {success = true, email = user.Email});
                }
                else
                {
                    return new ObjectResult(new {success = false, reason = result.Errors.ToString()});
                }
            }
        }

        // POST: /Authentication/Login
        [HttpPost]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<IActionResult> Login([FromBody] RegisterLoginRequest loginRequest)
        {
            var email = loginRequest.Email;
            var password = loginRequest.Password;
            
            if (User.Identity.IsAuthenticated)
            {
                return new ObjectResult(new {success = true, reason = "already logged in", email = email});
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ObjectResult(new {success = false, reason = "not found"});
            }
            else
            {
                await _signInManager.PasswordSignInAsync(user, password, true, false);
                return new ObjectResult(new {success = true, email = user.Email});
            }
        }

        // POST: /Authentication/Login
        [HttpPost]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<IActionResult> Logout()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new ObjectResult(new {success = false, reason = "not logged in"});
            }

            await _signInManager.SignOutAsync();
            return new ObjectResult(new {success = true});
        }
    }
}