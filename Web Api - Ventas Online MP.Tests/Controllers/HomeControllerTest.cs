using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Web_Api___Ventas_Online_MP;
using Web_Api___Ventas_Online_MP.Controllers;

namespace Web_Api___Ventas_Online_MP.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Disponer
            HomeController controller = new HomeController();

            // Actuar
            ViewResult result = controller.Index() as ViewResult;

            // Declarar
            Assert.IsNotNull(result);
            Assert.AreEqual("Home Page", result.ViewBag.Title);
        }
    }
}
