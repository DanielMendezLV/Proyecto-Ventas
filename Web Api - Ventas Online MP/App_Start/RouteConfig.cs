using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Web_Api___Ventas_Online_MP
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "VUsuarios", action = "Login", id = UrlParameter.Optional }
            );


            routes.MapRoute(
                 name: "WebAPI",
                 url: "{controller}/{action}/{id}",
                 defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Productos",
                url:"{controller}/{action}/{id}",
                defaults: new {controller = "VProductos", action="Productos", ir=UrlParameter.Optional}
            );

            routes.MapRoute(
                name: "Inicio",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "VHome", action = "Inicio", ir = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "ResumenCompras",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "VCompras", action = "Compras", ir = UrlParameter.Optional }
            );


        }
    }
}
