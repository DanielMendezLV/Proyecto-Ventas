using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Web_Api___Ventas_Online_MP.Models
{
    public class CompraProducto
    {
        [Key, Column(Order = 0)]
        public int CompraId { get; set; }
        [Key, Column(Order = 1)]
        public int ProductoId { get; set; }
     
        [Required]
        public int Total { get; set; }
        public virtual Compra Compra { get; set; }
        public virtual Producto Producto { get; set; }
    }
}