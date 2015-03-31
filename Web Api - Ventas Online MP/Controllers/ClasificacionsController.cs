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
    public class ClasificacionsController : ApiController
    {
        private WebVentasContext db = new WebVentasContext();

        // GET: api/Clasificacions
        public IQueryable<Clasificacion> GetClasificacions()
        {
            return db.Clasificacions;
        }

        // GET: api/Clasificacions/5
        [ResponseType(typeof(Clasificacion))]
        public IHttpActionResult GetClasificacion(int id)
        {
            Clasificacion clasificacion = db.Clasificacions.Find(id);
            if (clasificacion == null)
            {
                return NotFound();
            }

            return Ok(clasificacion);
        }

        // PUT: api/Clasificacions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClasificacion(int id, Clasificacion clasificacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clasificacion.ID)
            {
                return BadRequest();
            }

            db.Entry(clasificacion).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClasificacionExists(id))
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

        // POST: api/Clasificacions
        [ResponseType(typeof(Clasificacion))]
        public IHttpActionResult PostClasificacion(Clasificacion clasificacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Clasificacions.Add(clasificacion);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = clasificacion.ID }, clasificacion);
        }

        // DELETE: api/Clasificacions/5
        [ResponseType(typeof(Clasificacion))]
        public IHttpActionResult DeleteClasificacion(int id)
        {
            Clasificacion clasificacion = db.Clasificacions.Find(id);
            if (clasificacion == null)
            {
                return NotFound();
            }

            db.Clasificacions.Remove(clasificacion);
            db.SaveChanges();

            return Ok(clasificacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClasificacionExists(int id)
        {
            return db.Clasificacions.Count(e => e.ID == id) > 0;
        }
    }
}