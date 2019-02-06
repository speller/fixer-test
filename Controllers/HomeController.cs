using Microsoft.AspNetCore.Mvc;

namespace FixerTest.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Redirect("~/index.html");
        }
    }
}