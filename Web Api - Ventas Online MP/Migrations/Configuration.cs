namespace Web_Api___Ventas_Online_MP.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Web_Api___Ventas_Online_MP.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<Web_Api___Ventas_Online_MP.Models.VContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Web_Api___Ventas_Online_MP.Models.VContext context)
        {
            context.Rols.AddOrUpdate(r => r.ID,
                 new Rol[]{
                    new Rol(){ID=1, nombre="Admin"},
                    new Rol(){ID=2, nombre="User"},
                }
             );

            context.Usuarios.AddOrUpdate(u => u.RolId,
                new Usuario[] { 
                    new Usuario(){ID=1, nombre="Daniel", apellido="Mendez", correo="albert-dnl@hotmail.com", telefono=51244983, password="123",RolId=1},
                    new Usuario(){ID=2, nombre="Camila", apellido="Lone", correo="lone-ln@hotmail.com", telefono=50195891,password="app", RolId=2},
                }
            );
        }
    }
}
