using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ikabuhi.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly string _jwtSecret;

        public AuthController(IConfiguration configuration, ApplicationDbContext context)
        {
            _context = context;
            _jwtSecret = configuration["Jwt:Secret"];
        }

        [AllowAnonymous]
        [HttpPost("member-login")]
        public async Task<IActionResult> MemberLogin([FromBody] LoginModel model)
        {
            var user = await _context.Members.SingleOrDefaultAsync(m => m.IsActive && m.UserName == model.UserName);
            if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
                return Unauthorized("LoginFailed");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.UserName),
                    new Claim(ClaimTypes.Role, "member"),
                    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                    new Claim(ClaimTypes.SerialNumber, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }

        [AllowAnonymous]
        [HttpPost("collector-login")]
        public async Task<IActionResult> CollectorLogin([FromBody] LoginModel model)
        {
            var user = await _context.Collectors.SingleOrDefaultAsync(m => m.IsActive && m.UserName == model.UserName);
            if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
                return Unauthorized("LoginFailed");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.UserName),
                    new Claim(ClaimTypes.Role, "collector"),
                    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                    new Claim(ClaimTypes.SerialNumber, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }
    }

    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}