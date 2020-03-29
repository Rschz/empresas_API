using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Empresas_MVC.Models;

namespace Empresas_MVC.Controllers
{
    public class EmpresaController : Controller
    {
        private readonly Empresas_MVCContext _context;

        public EmpresaController(Empresas_MVCContext context)
        {
            _context = context;
        }

        // GET: Empresa
        public async Task<IActionResult> Index()
        {
            return View(await _context.empresa.ToListAsync());
        }

        // GET: Empresa/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var empresaViewModel = await _context.empresa
                .FirstOrDefaultAsync(m => m.EmpresaID == id);
            if (empresaViewModel == null)
            {
                return NotFound();
            }

            return View(empresaViewModel);
        }

        // GET: Empresa/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Empresa/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("EmpresaID,Nombre,Correo,Direccion,Postal")] EmpresaViewModel empresaViewModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(empresaViewModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(empresaViewModel);
        }

        // GET: Empresa/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var empresaViewModel = await _context.empresa.FindAsync(id);
            if (empresaViewModel == null)
            {
                return NotFound();
            }
            return View(empresaViewModel);
        }

        // POST: Empresa/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("EmpresaID,Nombre,Correo,Direccion,Postal")] EmpresaViewModel empresaViewModel)
        {
            if (id != empresaViewModel.EmpresaID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(empresaViewModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmpresaViewModelExists(empresaViewModel.EmpresaID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(empresaViewModel);
        }

        // GET: Empresa/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var empresaViewModel = await _context.empresa
                .FirstOrDefaultAsync(m => m.EmpresaID == id);
            if (empresaViewModel == null)
            {
                return NotFound();
            }

            return View(empresaViewModel);
        }

        // POST: Empresa/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var empresaViewModel = await _context.empresa.FindAsync(id);
            _context.empresa.Remove(empresaViewModel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EmpresaViewModelExists(int id)
        {
            return _context.empresa.Any(e => e.EmpresaID == id);
        }
    }
}
