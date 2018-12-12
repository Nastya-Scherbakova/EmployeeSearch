using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeSearch.Models
{
    [Table("opportunity")]
    public class Opportunity
    {
        [Column("opportunity_id")]
        public int Id {get; set;}
        [Column("opportunity_quantity")]
        public int Quantity {get; set;}
        [Column("directory_id")]
        public int DirectoryId {get; set;}
        [Column("cv_id")]
        public int CVId {get; set;}    
        [ForeignKey("DirectoryId")]
        public Directory Directory {get; set;}
        [ForeignKey("CVId")]
        public CV CV {get; set;}
    }
}
