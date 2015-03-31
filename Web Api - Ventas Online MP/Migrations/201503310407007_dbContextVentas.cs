namespace Web_Api___Ventas_Online_MP.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbContextVentas : DbMigration
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
            
            CreateTable(
                "dbo.Rols",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        nombre = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Usuarios", "RolId", "dbo.Rols");
            DropForeignKey("dbo.Productoes", "ClasificacionId", "dbo.Clasificacions");
            DropIndex("dbo.Usuarios", new[] { "RolId" });
            DropIndex("dbo.Productoes", new[] { "ClasificacionId" });
            DropTable("dbo.Usuarios");
            DropTable("dbo.Rols");
            DropTable("dbo.Productoes");
            DropTable("dbo.Clasificacions");
        }
    }
}
