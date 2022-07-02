using Hrms.Lite.Essp.Services.IServices.Home;
using Hrms.Lite.Essp.Shared.General;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Test.Models;

namespace Test.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHomeService _homeService;

        public HomeController(IHomeService homeService, ILogger<HomeController> logger)
        {
            _homeService = homeService;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpPost]
        public async Task<IActionResult> ChangeTheme(string ThemeName)
        {
            Theme model = new Theme();
            model.ThemeName = ThemeName;
            var response = await _homeService.SaveTheme(model);
            return Json("Saved Successfully");
        }
        public async Task<IActionResult> GetTheme()
        {
            Theme model = new Theme();
            model = await _homeService.GetTheme();

            return Json(model.ThemeName);
        }
    }
}
