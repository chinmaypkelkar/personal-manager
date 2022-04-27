using System.Linq;
using Microsoft.AspNetCore.Http;
using Personal_Manager_Backend.Services.Interfaces;

namespace Personal_Manager_Backend.Services.Classes
{
    public class CurrentUserService: ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUserName()
        {
            var userName = _httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(x=>x.Type == "userName")?.Value;
            return userName;
        }
        public string GetPersonId()
        {
            var personId = _httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(x=>x.Type == "personId")?.Value;
            return personId;
        }
    }
}