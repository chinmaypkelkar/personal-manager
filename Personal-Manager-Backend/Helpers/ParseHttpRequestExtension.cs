using Microsoft.AspNetCore.Http;

namespace Personal_Manager_Backend.Helpers
{
    public static class ParseHttpRequestExtension
    {
        public static string GetTest(this HttpRequest request, string key)
        {
            var test = request;
            return string.Empty;
        }
    }
}