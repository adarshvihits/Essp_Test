using Hrms.Lite.Essp.Shared.Essp.Generic;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.General
{
    public interface ICommonService
    {
        public Task<ResponseEntity> CheckEmptyDropDown(string Mode);
        public Task<EmployeeHeader> GetEmployeeCard(int EmpCode);
        public Task<EmployeeHeader> GetEmployeeHeader(Guid EmployeeGI);
        Task<List<Dropdown>> GetDurationWiseFilterSlabDropDown();

        public Task<ResponseEntity<string>> GetCurrentLeavePeriod();
        public Task<AddOnClassification> GetAddOnClassificationApplicability();


        public Task<List<EmployeeAuthority>> GetEmployeeAuthorityDetails();
        public Task<ResponseEntity<Int32>> GetCurrentLFinancialYear();

    }
}
