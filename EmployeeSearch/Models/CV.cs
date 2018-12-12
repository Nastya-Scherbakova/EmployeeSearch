using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeSearch.Models
{
    [Table("cv")]
    public class CV
    {
        [Column("cv_id")]
        public int Id {get; set;}
        [Column("cv_position")]
        public string Position {get; set;}
        [Column("cv_salary")]
        public int Salary {get; set;}
        [Column("person_id")]
        public int PersonId {get; set;}
        [ForeignKey("PersonId")]
        public Person Person {get; set;}

        public ICollection<Opportunity> Opportunities {get; set;}

    }
}
