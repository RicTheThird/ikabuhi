using TimeZoneConverter;

namespace Ikabuhi.Backend.Extensions
{
    public static class StringExtensions
    {
        public static string Hash(this string value)
        {
            return BCrypt.Net.BCrypt.HashPassword(value);
        }
    }
}