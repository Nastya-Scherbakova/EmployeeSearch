using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeSearch.Models
{
    [Table("person")]
    public class Person
    {
        [Column("person_id")]
        public int Id {get; set;}
        [Column("person_name")]
        public string Name {get; set;}
        [Column("person_lastname")]
        public string LastName {get; set;}
        [Column("person_email")]
        public string Email {get; set;}
        [Column("person_number")]
        public string Number {get; set;}

        public CV CV {get; set;}
    }
}
