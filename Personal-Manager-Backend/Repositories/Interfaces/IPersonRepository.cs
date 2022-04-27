using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;

namespace Personal_Manager_Backend.Repositories.Interfaces
{
    public interface IPersonRepository
    {
        Task Signup(Person person);
        Task<Person> GetPerson(string userName, string password);
        Task<bool> IsPersonExists(string userName);
    }
}