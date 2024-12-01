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
    public class NotificationsController : BaseController
    {
        private readonly ApplicationDbContext _context;

        public NotificationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Notifications
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<Notification>>> GetNotification()
        {
            var notification = await _context.Notifications
                .Where(n => n.MemberId == GetUserId()).OrderByDescending(m => m.CreatedAt).Take(20).ToListAsync();

            if (notification == null)
            {
                return NotFound();
            }

            return notification;
        }

        // PUT: api/Notifications/read/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("read/{id}")]
        public async Task<IActionResult> PutNotification(Guid id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            notification.IsSeen = true;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotificationExists(id))
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

        // POST: api/Notifications
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Notification>> PostNotification(Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotification", new { id = notification.Id }, notification);
        }

        // DELETE: api/Notifications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(Guid id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound();
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NotificationExists(Guid id)
        {
            return _context.Notifications.Any(e => e.Id == id);
        }
    }
}