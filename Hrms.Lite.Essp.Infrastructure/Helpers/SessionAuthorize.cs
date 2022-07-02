using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Hrms.Lite.Infrastructure.Helpers
{
    public class SessionAuthorize : ActionFilterAttribute
    {

        //public override void OnActionExecuting(ActionExecutingContext filterContext)
        //{
        //  var session = filterContext.HttpContext.Session;
        //    string _Controller = filterContext.;
        //    string _Action = filterContext.ActionDescriptor.ActionName;
        //    string[] _ExceptionAction = { "User:Login", "User:Logout", "User:ChangePassword", "Home:ShowNotifications", "User:ForgotPassword", "User:ResetPassword" };

        //    if (_ExceptionAction.Contains(String.Format("{0}:{1}", _Controller, _Action)))
        //    {
        //        return;
        //    }

       
        //    if (Convert.ToInt32(HttpContext..Session["EMPID"]) != 0) return;
        //    var redirectTarget = new RouteValueDictionary { { "action", "Login" }, { "controller", "User" } };
        //    filterContext.Result = new RedirectToRouteResult(redirectTarget);
        //}

    }
}
