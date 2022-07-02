using Hrms.Lite.Essp.Shared.DataBank.Generic.Master;
using Hrms.Lite.Essp.Shared.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hrms.Lite.Essp.Shared.DataBank.Generic
{
    public class CompensationStructure
    {
        public int? OfferedSalary { get; set; }
        public DateTime? EffectFrom { get; set; }
        public int? CTC { get; set; }
        public int? GrossSalary { get; set; }
        public bool PF { get; set; }
        public bool ESI { get; set; }
        public SalaryStructure SalaryStructure { get; set; }
        public List<Allowance> FixedAllowance { get; set; }
        public List<Allowance> VariableAllowance { get; set; }
        public List<Deduction> FixedDeduction { get; set; }
        public List<Deduction> VariableDeduction { get; set; }
        public List<Provisions> FixedProvisions { get; set; }
        public List<Provisions> VariableProvisions { get; set; }
    }
}
