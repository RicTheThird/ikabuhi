using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ikabuhi.Backend;
using Ikabuhi.Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductLoansController : BaseController
    {
        private readonly ApplicationDbContext _context;

        public ProductLoansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductLoans
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductLoan>>> GetProductLoans()
        {
            return await _context.ProductLoans.ToListAsync();
        }

        // GET: api/ProductLoans/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductLoan>> GetProductLoan(Guid id)
        {
            var productLoan = await _context.ProductLoans.FindAsync(id);

            if (productLoan == null)
            {
                return NotFound();
            }

            return productLoan;
        }

        // PUT: api/ProductLoans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductLoan(Guid id, ProductLoan productLoan)
        {
            if (id != productLoan.Id)
            {
                return BadRequest();
            }

            _context.Entry(productLoan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductLoanExists(id))
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

        // POST: api/ProductLoans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProductLoan>> PostProductLoan(ProductLoan productLoan)
        {
            _context.ProductLoans.Add(productLoan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductLoan", new { id = productLoan.Id }, productLoan);
        }

        // DELETE: api/ProductLoans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductLoan(Guid id)
        {
            var productLoan = await _context.ProductLoans.FindAsync(id);
            if (productLoan == null)
            {
                return NotFound();
            }

            _context.ProductLoans.Remove(productLoan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductLoanExists(Guid id)
        {
            return _context.ProductLoans.Any(e => e.Id == id);
        }
    }
}
