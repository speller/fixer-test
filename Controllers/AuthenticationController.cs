using System.Threading.Tasks;
using FixerTest.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FixerTest.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthenticationController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // POST: /Authentication/AjaxRegister
        [HttpPost]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<IActionResult> AjaxRegister([FromBody] RegisterLoginRequest loginRequest)
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
                    return new OkObjectResult(new {success = true, id = user.Id});
                }
                else
                {
                    return new ObjectResult(new {success = false, reason = result.Errors.ToString()});
                }
            }
        }

        // POST: /Authentication/AjaxLogin
        [HttpPost]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<IActionResult> AjaxLogin([FromBody] RegisterLoginRequest loginRequest)
        {
            var email = loginRequest.Email;
            var password = loginRequest.Password;
            
            if (User.Identity.IsAuthenticated)
            {
                return new ObjectResult(new {success = true, reason = "already logged in"});
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ObjectResult(new {success = false, reason = "not found"});
            }
            else
            {
                await _signInManager.SignInAsync(user, true);
                return new OkObjectResult(new {success = true, id = user.Id});
            }
        }

    }
}