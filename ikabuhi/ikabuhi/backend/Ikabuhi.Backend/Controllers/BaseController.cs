using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Ikabuhi.Backend.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected Guid GetUserId()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.SerialNumber);
                return Guid.Parse(userIdClaim?.Value);
            }
            return Guid.Empty; // or throw an exception if you want to enforce that the user must be authenticated
        }

        protected string GetUserEmail()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
                return userIdClaim?.Value;
            }
            return null; // or throw an exception if you want to enforce that the user must be authenticated
        }

        protected string GetUserFirstName()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
                return userIdClaim?.Value.Split(" ")[0];
            }
            return null; // or throw an exception if you want to enforce that the user must be authenticated
        }
    }
}