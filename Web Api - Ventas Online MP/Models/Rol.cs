using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web_Api___Ventas_Online_MP.Models
{
    public class Rol
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public String nombre { get; set; }
    }
}