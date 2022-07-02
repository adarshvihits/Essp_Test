using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.ESSP.Regularization;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hrms.Lite.Essp.Services.IServices.ESSP
{
    public interface IAbsenteeismRegularizationService
    {
        public Task<AbsenteeismRegularization> GetAbsenteeismList(int month, string TabIndex);
        public Task<IList<ShiftDetails>> GetShiftDetails();
        public Task<AbsenteeismRegularization> GetTracker(Guid LeaveGI, string Type);
    }
}
