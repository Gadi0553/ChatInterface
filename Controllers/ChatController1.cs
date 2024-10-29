using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreSignalRDemo.Controllers
{
    public class ChatController1 : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }

}
