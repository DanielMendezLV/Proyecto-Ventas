using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Web_Api___Ventas_Online_MP.Models;

namespace Web_Api___Ventas_Online_MP.Models
{
    public class Compra
    {
        [Key]
        public int ID { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString="{0:dd-MM-yyyy}", ApplyFormatInEditMode=true)]
        public DateTime Fecha { get; set; }
        [Required]
        public int Total { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public virtual ICollection<CompraProducto> CompraProductos { get; set; }
    }
}