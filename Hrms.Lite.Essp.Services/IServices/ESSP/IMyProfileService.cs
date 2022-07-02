using Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails;
using Hrms.Lite.Essp.Shared.ESSP.MyProfile;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.ESSP
{
    public interface IMyProfileService
    {
        public Task<MyProfile> GetMyProfileDetails();
        public Task<MyProfile> GetPersonalDetails();
        public Task<ResponseEntity> SaveMyProfileDetails(MyProfile myProfile);
        public Task<MyProfile> GetMyProfileEducation(Guid LogGI);
        public Task<MyProfile> GetMyProfileFamily(Guid LogGI);
        public Task<MyProfile> GetMyProfilePrevEmployment(Guid LogGI);
        public Task<ResponseEntity> DeleteMyProfileEducation(Guid LogGI);
        public Task<ResponseEntity> DeleteMyProfileFamilyDetails(Guid LogGI);
        public Task<ResponseEntity> DeleteMyProfilePrevEmployment(Guid LogGI);
        public Task<PersonalDetailsDropDown> GetPersonalDetailsDropDown();
    }
}
