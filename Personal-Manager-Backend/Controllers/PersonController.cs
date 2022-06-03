using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal_Manager_Backend.Services.Interfaces;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Controllers
{
    [ApiController]
    public class PersonController
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }
        
        [AllowAnonymous]
        [HttpPost("[Controller]/[Action]")]
        public Task SignUp([FromBody] SignUpViewModel signUpRequest)
        {
            return _personService.Signup(signUpRequest);
        }

        [AllowAnonymous]
        [HttpGet("[Controller]/[Action]")]
        public async Task<TokenViewModel> SignIn([FromQuery] string userName, [FromQuery] string password)
        {
            return await _personService.SignIn(userName, password);
        }
    }
}