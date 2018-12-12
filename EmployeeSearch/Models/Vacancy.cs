using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeSearch.Models
{
    [Table("vacancy")]
    public class Vacancy
    {
        [Column("vacancy_id")]
        public int Id {get; set;}
        [Column("vacancy_position")]
        public string Position {get; set;}
        [Column("vacancy_salary")]
        public int Salary {get; set;}
        [Column("vacancy_social_package")]
        public bool SocialPackage {get; set;}
        [Column("company_id")]
        public int CompanyId {get; set;}
        [ForeignKey("CompanyId")]
        public Company Company {get; set;}

        public ICollection<Requirment> Requirments {get; set;}
    }
}
