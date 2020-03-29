using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Empresas_MVC.Models;

namespace Empresas_MVC.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly Empresas_MVCContext _context;

        public EmpresaController(Empresas_MVCContext context)
        {
            _context = context;
        }

        // GET: api/Empresa
        [HttpGet]
        public IEnumerable<EmpresaViewModel> Getempresa()
        {
            return _context.empresa;
        }

        // GET: api/Empresa/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmpresaViewModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var empresaViewModel = await _context.empresa.FindAsync(id);

            if (empresaViewModel == null)
            {
                return NotFound();
            }

            return Ok(empresaViewModel);
        }

        // PUT: api/Empresa/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpresaViewModel([FromRoute] int id, [FromBody] EmpresaViewModel empresaViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != empresaViewModel.EmpresaID)
            {
                return BadRequest();
            }

            _context.Entry(empresaViewModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpresaViewModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Empresa
        [HttpPost]
        public async Task<IActionResult> PostEmpresaViewModel([FromBody] EmpresaViewModel empresaViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.empresa.Add(empresaViewModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpresaViewModel", new { id = empresaViewModel.EmpresaID }, empresaViewModel);
        }

        // DELETE: api/Empresa/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpresaViewModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var empresaViewModel = await _context.empresa.FindAsync(id);
            if (empresaViewModel == null)
            {
                return NotFound();
            }

            _context.empresa.Remove(empresaViewModel);
            await _context.SaveChangesAsync();

            return Ok(empresaViewModel);
        }

        private bool EmpresaViewModelExists(int id)
        {
            return _context.empresa.Any(e => e.EmpresaID == id);
        }
    }
}