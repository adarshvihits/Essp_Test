using Hrms.Lite.Essp.Services.IServices.Account;
using Hrms.Lite.Essp.Shared.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace Hrms.Lite.UI.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _AccountService;

        public AccountController(IAccountService AccountService)
        {
            _AccountService = AccountService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Login()
        {
            return View("~/Views/Account/Login.cshtml");
        }
        [HttpPost]
        public async Task<IActionResult> Login(Login Credentials)
        {
            //Login credentials = new Login { CompanyCode = "IHS", Password = "Ihits", UserCode = "Ihits" };

            var response = await _AccountService.Login(Credentials);
            if (response.Success == false)
            {
                TempData["Message"] = response.Message;
                return RedirectToAction("Login", "Account");
            }
            Login login = JsonConvert.DeserializeObject<Login>(response.Data);
            HttpContext.Session.SetString("JwtToken", login.Token);
            HttpContext.Session.SetString("LoginUser", login.UserCode);
            HttpContext.Session.SetString("User", response.Data);
            HttpContext.Session.SetString("CompanyName", login.authUser.CompanyName);
            //ViewData["HrmsTitle"] = login.CompanyName;

            return RedirectToAction("Index", "Home");
        }

        public async Task<IActionResult> Logout()
        {
            Login model = new Login();
            model.MACAddress = getMacAddress();
            model.software = "HRMS";
            model.INOUT = "OUT";
            await _AccountService.LogHistory(model);

            HttpContext.Session.Clear();
            foreach (var cookie in Request.Cookies.Keys)
            {

                HttpContext.Session.Remove(cookie);
                HttpContext.Response.Cookies.Delete(cookie);

            }
            return RedirectToAction("Login");
        }
        public string getMacAddress()
        {
            string hex = "";
            foreach (NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces())
            {
                if (nic.NetworkInterfaceType == NetworkInterfaceType.Ethernet && nic.OperationalStatus == OperationalStatus.Up)
                {
                    hex = BitConverter.ToString(nic.GetPhysicalAddress().GetAddressBytes());
                }
                else if (nic.NetworkInterfaceType == NetworkInterfaceType.Wireless80211 && nic.OperationalStatus == OperationalStatus.Up)
                {
                    hex = BitConverter.ToString(nic.GetPhysicalAddress().GetAddressBytes());
                }
            }
            return hex;
        }
    }
}
