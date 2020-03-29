using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Empresas_MVC.Models
{
    public class Empresas_MVCContext : DbContext
    {
        public Empresas_MVCContext (DbContextOptions<Empresas_MVCContext> options)
            : base(options)
        {
        }

        public DbSet<Empresas_MVC.Models.EmpresaViewModel> empresa { get; set; }
    }
}
