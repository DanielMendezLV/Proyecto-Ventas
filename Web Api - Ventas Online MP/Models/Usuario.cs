using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Web_Api___Ventas_Online_MP.Models
{
    public class Usuario
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public String nombre { get; set; }
        [Required]
        public String apellido { get; set; }
        [Required]
        public String correo { get; set; }
        [Required]
        public int telefono { get; set; }
        [Required]
        public String password { get; set; }

        public int RolId { get; set; }
        public Rol Rol { get; set; }
    }
}