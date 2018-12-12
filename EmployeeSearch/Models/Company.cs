using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeSearch.Models
{
    [Table("company")]
    public class Company
    {
        [Column("company_id")]
        public int Id {get; set;}
        [Column("company_title")]
        public string Title {get; set;}
        [Column("company_email")]
        public string Email {get; set;}
        [Column("company_number")]
        public string Number {get; set;}

        public ICollection<Vacancy> Vacancies {get; set;}
    }
}
