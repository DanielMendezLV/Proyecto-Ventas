using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Web_Api___Ventas_Online_MP.Models
{
    public class Clasificacion
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public String Nombre { get; set; }
    }
}