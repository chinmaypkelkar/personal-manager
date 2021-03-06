using System.Threading.Tasks;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services.Interfaces
{
    public interface IPersonService
    {
        Task Signup(SignUpViewModel signUpRequest);
        Task<TokenViewModel> SignIn(string userName,string password);
    }
}