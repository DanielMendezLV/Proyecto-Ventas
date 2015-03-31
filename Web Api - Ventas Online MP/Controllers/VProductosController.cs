using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Api___Ventas_Online_MP.Controllers
{
    public class VProductosController : Controller
    {
        // GET: VProductos
        public ActionResult Productos()
        {
            return View();
        }
    }
}