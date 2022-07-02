using Hrms.Lite.Essp.Infrastructure.Helpers;
using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.Account;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Services.IServices.General;
using Hrms.Lite.Essp.Services.IServices.Home;
using Hrms.Lite.Essp.Services.Services.Account;
using Hrms.Lite.Essp.Services.Services.ESSP;
using Hrms.Lite.Essp.Services.Services.General;
using Hrms.Lite.Essp.Services.Services.Home;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.UI.Core
{
    public static class AppDependencyInjection
    {
        public static void AddDependencyInjectionServices(this IServiceCollection services)
        {
            #region General
            services.AddTransient<IServiceBase, ServiceBase>();
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IDropdownService, DropdownService>();
            services.AddTransient<ICommonService, CommonService>();
            services.AddTransient<IHomeService, HomeService>();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.TryAddSingleton<IBlob, Blob>();
            #endregion

          

          

         
           
            #region ESSP
            services.AddTransient<ILeaveApplicationService, LeaveApplicationService>();
            services.AddTransient<IOnDutyApplicationService, OnDutyApplicationService>();
            services.AddTransient<IWFHApplicationService, WFHApplicationService>();
            services.AddTransient<IAbsenteeismRegularizationService, AbsenteeismRegularizationService>();
            services.AddTransient<ICoffApplicationService, CoffApplicationService>();
            services.AddTransient<IMyProfileService, MyProfileService>();
            services.AddTransient<IAttendanceRegularizationService, AttendanceRegularizationService>();


            #endregion
        }
    }
}
