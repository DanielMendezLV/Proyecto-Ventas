using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Web_Api___Ventas_Online_MP.Models
{
    public class CompraProducto
    {
        [Key, Column(Order = 0)]
        public int CompraId { get; set; }
        [Key, Column(Order = 1)]
        public int ProductoId { get; set; }
        public int  Cantidad{ get; set; }
        public int Precio { get; set; }
        [JsonIgnore]
        public virtual Compra Compra { get; set; }
        [JsonIgnore]
        public virtual Producto Producto { get; set; }
    }
}