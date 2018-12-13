using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeSearch.Models
{
    [Table("directory")]
    public class Directory
    {
        [Column("directory_id")]
        public int Id {get; set;}
        [Column("directory_name")]
        public string Name {get; set;}
    }
}
