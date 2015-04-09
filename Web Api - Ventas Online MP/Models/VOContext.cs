using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Web_Api___Ventas_Online_MP.Models
{
    public class VOContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public VOContext() : base("name=VOContext")
        {
        }

        public System.Data.Entity.DbSet<Web_Api___Ventas_Online_MP.Models.Rol> Rols { get; set; }

        public System.Data.Entity.DbSet<Web_Api___Ventas_Online_MP.Models.Clasificacion> Clasificacions { get; set; }

        public System.Data.Entity.DbSet<Web_Api___Ventas_Online_MP.Models.Usuario> Usuarios { get; set; }

        public System.Data.Entity.DbSet<Web_Api___Ventas_Online_MP.Models.Producto> Productoes { get; set; }

        public System.Data.Entity.DbSet<Web_Api___Ventas_Online_MP.Models.Compra> Compras { get; set; }

        public System.Data.Entity.DbSet<Web_Api___Ventas_Online_MP.Models.CompraProducto> CompraProductoes { get; set; }
    
    }
}
