using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Web_Api___Ventas_Online_MP.Models;

namespace Web_Api___Ventas_Online_MP.Controllers
{
    public class RegistrarCompraController : ApiController
    {
        private VOContext db = new VOContext();


        // GET: api/CompraProductoes/5
        public String PostRegistrarCompra(IEnumerable<CompraProducto> pList)
        {
            //int idUsuario=0;
            //Compra compra=null;

            foreach (CompraProducto comp in pList)
            {
                
                 db.CompraProductoes.Add(comp);
                
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return ("Error");

            }

            // SI funciona la compra.ID;
            return "Compra realizada con exito";
        }

        public string GetRegistrarCompra()
        {
            return "Metodo Get";
        }

        public string GetRegistrarCompraByID(string id)
        {
            return "Metodo Get  ID";
        }

        public string PutRegistrarCompra(string id, CompraProducto obj)
        {
            return "Metodo Put";
        }

        public string DeleteCustomer(string id)
        {
            return "Metodo Delete";
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }


    }
}
