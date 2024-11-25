using TimeZoneConverter;

namespace Ikabuhi.Backend.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime ToSEATimeFromUtc(this DateTime value)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(value, TZConvert.GetTimeZoneInfo("Singapore Standard Time"));
        }
    }
}