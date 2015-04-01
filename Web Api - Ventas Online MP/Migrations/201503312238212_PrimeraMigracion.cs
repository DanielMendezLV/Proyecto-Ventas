namespace Web_Api___Ventas_Online_MP.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PrimeraMigracion : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clasificacions",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nombre = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.CompraProductoes",
                c => new
                    {
                        CompraId = c.Int(nullable: false),
                        ProductoId = c.Int(nullable: false),
                        Total = c.Int(nullable: false),
                        Usuario_ID = c.Int(),
                    })
                .PrimaryKey(t => new { t.CompraId, t.ProductoId })
                .ForeignKey("dbo.Compras", t => t.CompraId, cascadeDelete: true)
                .ForeignKey("dbo.Usuarios", t => t.Usuario_ID)
                .ForeignKey("dbo.Productoes", t => t.ProductoId, cascadeDelete: true)
                .Index(t => t.CompraId)
                .Index(t => t.ProductoId)
                .Index(t => t.Usuario_ID);
            
            CreateTable(
                "dbo.Compras",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Fecha = c.DateTime(nullable: false),
                        Total = c.Int(nullable: false),
                        UsuarioId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Usuarios", t => t.UsuarioId, cascadeDelete: true)
                .Index(t => t.UsuarioId);
            
            CreateTable(
                "dbo.Usuarios",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        nombre = c.String(nullable: false),
                        apellido = c.String(nullable: false),
                        correo = c.String(nullable: false),
                        telefono = c.Int(nullable: false),
                        password = c.String(nullable: false),
                        RolId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Rols", t => t.RolId, cascadeDelete: true)
                .Index(t => t.RolId);
            
            CreateTable(
                "dbo.Rols",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        nombre = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Productoes",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nombre = c.String(nullable: false),
                        Descripcion = c.String(nullable: false),
                        Precio = c.Int(nullable: false),
                        ClasificacionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Clasificacions", t => t.ClasificacionId, cascadeDelete: true)
                .Index(t => t.ClasificacionId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CompraProductoes", "ProductoId", "dbo.Productoes");
            DropForeignKey("dbo.Productoes", "ClasificacionId", "dbo.Clasificacions");
            DropForeignKey("dbo.Compras", "UsuarioId", "dbo.Usuarios");
            DropForeignKey("dbo.Usuarios", "RolId", "dbo.Rols");
            DropForeignKey("dbo.CompraProductoes", "Usuario_ID", "dbo.Usuarios");
            DropForeignKey("dbo.CompraProductoes", "CompraId", "dbo.Compras");
            DropIndex("dbo.Productoes", new[] { "ClasificacionId" });
            DropIndex("dbo.Usuarios", new[] { "RolId" });
            DropIndex("dbo.Compras", new[] { "UsuarioId" });
            DropIndex("dbo.CompraProductoes", new[] { "Usuario_ID" });
            DropIndex("dbo.CompraProductoes", new[] { "ProductoId" });
            DropIndex("dbo.CompraProductoes", new[] { "CompraId" });
            DropTable("dbo.Productoes");
            DropTable("dbo.Rols");
            DropTable("dbo.Usuarios");
            DropTable("dbo.Compras");
            DropTable("dbo.CompraProductoes");
            DropTable("dbo.Clasificacions");
        }
    }
}
