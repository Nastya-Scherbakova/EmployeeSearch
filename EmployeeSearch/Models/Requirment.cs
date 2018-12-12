using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeSearch.Models
{
    [Table("requirment")]
    public class Requirment
    {
        [Column("requirment_id")]
        public int Id {get; set;}
        [Column("requirment_quantity")]
        public int Quantity {get; set;}
        [Column("directory_id")]
        public int DirectoryId {get; set;}
        [Column("vacancy_id")]
        public int VacancyId {get; set;}    
        [ForeignKey("DirectoryId")]
        public Directory Directory {get; set;}
        [ForeignKey("VacancyId")]
        public Vacancy Vacancy {get; set;}
    }
}
