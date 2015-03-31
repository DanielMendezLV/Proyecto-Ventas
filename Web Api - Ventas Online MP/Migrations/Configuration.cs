namespace Web_Api___Ventas_Online_MP.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Web_Api___Ventas_Online_MP.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<Web_Api___Ventas_Online_MP.Models.WebVentasContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Web_Api___Ventas_Online_MP.Models.WebVentasContext context)
        {
            //context.Rols.AddOrUpdate(r => r.ID,
            //     new Rol[]{
            //        new Rol(){ID=1, nombre="Admin"},
            //        new Rol(){ID=2, nombre="User"},
            //    }
            // );

            //context.Usuarios.AddOrUpdate(u => u.RolId,
            //    new Usuario[] { 
            //        new Usuario(){ID=1, nombre="Daniel", apellido="Mendez", correo="albert-dnl@hotmail.com", telefono=51244983, password="123",RolId=1},
            //        new Usuario(){ID=2, nombre="Camila", apellido="Lone", correo="lone-ln@hotmail.com", telefono=50195891,password="app", RolId=2},
            //    }
            //);

            //context.Clasificacions.AddOrUpdate(c => c.ID,
            //    new Clasificacion[] { 
            //        new Clasificacion(){ID=1, Nombre="Tecnologia"},
            //        new Clasificacion(){ID=2, Nombre="Uso Diario"}
            //    }
            //);

            //context.Productoes.AddOrUpdate(p => p.ID,
            //    new Producto[] { 
            //        new Producto(){ID=1, Nombre="Ipad", Descripcion="Cambia tu mundo", Precio=2000, ClasificacionId=1},
            //        new Producto(){ID=1, Nombre="Mueble Aitchi", Descripcion="La mejor madera en tus muebles", Precio=5000, ClasificacionId=2}
            //    }
            //);
        }
    }
}
