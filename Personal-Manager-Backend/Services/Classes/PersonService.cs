using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.Repositories;
using Personal_Manager_Backend.Repositories.Interfaces;
using Personal_Manager_Backend.Services.Interfaces;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services.Classes
{
    public class PersonService: IPersonService
    {
        private readonly IPersonRepository _personRepository;
        private readonly IConfiguration _configuration;

        public PersonService(IPersonRepository personRepository,IConfiguration configuration)
        {
            _personRepository = personRepository;
            _configuration = configuration;
        }
        public async Task Signup(SignUpViewModel signUpRequest)
        {
            var isPersonExists = await _personRepository.IsPersonExists(signUpRequest.UserName);
            if (isPersonExists)
            {
                throw new Exception(
                        "Person with given userName already exists in the system. Sign in for further information");
            }

            var person = new Person
            {
                FirstName = signUpRequest.FirstName,
                LastName = signUpRequest.LastName,
                Email = signUpRequest.Email,
                UserName = signUpRequest.UserName,
                Password = signUpRequest.Password
            };

            await _personRepository.Signup(person);
        }
        
        public async Task<TokenViewModel> SignIn(string userName, string password)
        {
            var person = 
                await _personRepository.GetPerson(userName, password);
            if (person == null)
            {
                throw new UnauthorizedAccessException(
                    "the given user is not present in the system. Please sign up for access");
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("Secret"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                    {new("personId", person.PersonId.ToString()), new("userName", person.UserName)}),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            tokenHandler.WriteToken(token);
            return new TokenViewModel
            {
                PersonId = person.PersonId,
                Token = tokenHandler.WriteToken(token)
            };
        }
        
        
    }
}