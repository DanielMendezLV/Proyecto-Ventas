using System.Web;
using System.Web.Mvc;

namespace Web_Api___Ventas_Online_MP
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
