// create a model class name User

using System.ComponentModel.DataAnnotations;

namespace AztroWebApplication.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public int Age { get; set; }

        public User()
        {
            Name = string.Empty;
            Email = string.Empty;
        }
    }
}