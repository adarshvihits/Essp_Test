using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Services.IServices.ESSP;
using Hrms.Lite.Essp.Shared.DataBank.Generic.PersonalDetails;
using Hrms.Lite.Essp.Shared.ESSP.MyProfile;
using Hrms.Lite.Essp.Shared.General;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.Services.ESSP
{
    public class MyProfileService : IMyProfileService
    {
        private readonly string _baseURL;
        private readonly IServiceBase _httpService;

        public MyProfileService(IServiceBase httpService)
        {
            _baseURL = "MyProfile";
            _httpService = httpService;
        }
        public async Task<MyProfile> GetMyProfileDetails()
        {
            return await _httpService.GetAsync<MyProfile>($"{_baseURL}/GetMyProfileDetails");
        }
        public async Task<MyProfile> GetPersonalDetails()
        {
            return await _httpService.GetAsync<MyProfile>($"{_baseURL}/GetPersonalDetails");
        }
        public async Task<ResponseEntity> SaveMyProfileDetails(MyProfile myProfile)
        {
            return await _httpService.PostAsync<ResponseEntity, MyProfile>($"{_baseURL}/SaveMyProfileDetails", myProfile);
        }
        public async Task<MyProfile> GetMyProfileEducation(Guid LogGI)
        {
            return await _httpService.GetAsync<MyProfile>($"{_baseURL}/GetMyProfileEducation?LogGI={LogGI}");
        }
        public async Task<MyProfile> GetMyProfileFamily(Guid LogGI)
        {
            return await _httpService.GetAsync<MyProfile>($"{_baseURL}/GetMyProfileFamily?LogGI={LogGI}");
        }

        public async Task<MyProfile> GetMyProfilePrevEmployment(Guid LogGI)
        {
            return await _httpService.GetAsync<MyProfile>($"{_baseURL}/GetMyProfilePrevEmployment?LogGI={LogGI}");
        }

        public async Task<ResponseEntity> DeleteMyProfileEducation(Guid LogGI)
        {
            return await _httpService.DeleteAsync<ResponseEntity>($"{_baseURL}/DeleteMyProfileEducation?LogGI={LogGI}");
        }
        public async Task<ResponseEntity> DeleteMyProfileFamilyDetails(Guid LogGI)
        {
            return await _httpService.DeleteAsync<ResponseEntity>($"{_baseURL}/DeleteMyProfileFamilyDetails?LogGI={LogGI}");
        }
        public async Task<ResponseEntity> DeleteMyProfilePrevEmployment(Guid LogGI)
        {
            return await _httpService.DeleteAsync<ResponseEntity>($"{_baseURL}/DeleteMyProfilePrevEmployment?LogGI={LogGI}");
        }
        public async Task<PersonalDetailsDropDown> GetPersonalDetailsDropDown()
        {
            return await _httpService.GetAsync<PersonalDetailsDropDown>($"PersonalDetails/GetPersonalDetailsDropDown");
        }
    }
}
