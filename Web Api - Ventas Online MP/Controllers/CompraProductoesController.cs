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
    public class CompraProductoesController : ApiController
    {
        private ContextVentas1 db = new ContextVentas1();

        // GET: api/CompraProductoes
        public IQueryable<CompraProducto> GetCompraProductoes()
        {
            return db.CompraProductoes;
        }

        // GET: api/CompraProductoes/5
        [ResponseType(typeof(CompraProducto))]
        public IHttpActionResult GetCompraProducto(int id)
        {
            CompraProducto compraProducto = db.CompraProductoes.Find(id);
            if (compraProducto == null)
            {
                return NotFound();
            }

            return Ok(compraProducto);
        }

        // PUT: api/CompraProductoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCompraProducto(int id, CompraProducto compraProducto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != compraProducto.CompraId)
            {
                return BadRequest();
            }

            db.Entry(compraProducto).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompraProductoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CompraProductoes
        [ResponseType(typeof(CompraProducto))]
        public IHttpActionResult PostCompraProducto(CompraProducto compraProducto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CompraProductoes.Add(compraProducto);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CompraProductoExists(compraProducto.CompraId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = compraProducto.CompraId }, compraProducto);
        }

        // DELETE: api/CompraProductoes/5
        [ResponseType(typeof(CompraProducto))]
        public IHttpActionResult DeleteCompraProducto(int id)
        {
            CompraProducto compraProducto = db.CompraProductoes.Find(id);
            if (compraProducto == null)
            {
                return NotFound();
            }

            db.CompraProductoes.Remove(compraProducto);
            db.SaveChanges();

            return Ok(compraProducto);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompraProductoExists(int id)
        {
            return db.CompraProductoes.Count(e => e.CompraId == id) > 0;
        }
    }
}