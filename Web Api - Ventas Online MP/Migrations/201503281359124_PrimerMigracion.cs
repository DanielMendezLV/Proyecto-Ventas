namespace Web_Api___Ventas_Online_MP.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PrimerMigracion : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Usuarios", "password", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Usuarios", "password");
        }
    }
}
