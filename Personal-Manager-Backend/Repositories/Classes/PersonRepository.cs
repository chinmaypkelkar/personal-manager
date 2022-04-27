using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.Repositories.Interfaces;

namespace Personal_Manager_Backend.Repositories.Classes
{
    public class PersonRepository : IPersonRepository
    {
        private readonly PersonalManagerContext _personalManagerContext;

        public PersonRepository(PersonalManagerContext personalManagerContext)
        {
            _personalManagerContext = personalManagerContext;
        }
        public async Task Signup(Person person)
        {
            _personalManagerContext.Add(person);
            await _personalManagerContext.SaveChangesAsync();
        }

        public Task<Person> GetPerson(string userName, string password)
        {
            return _personalManagerContext.People.AsNoTracking()
                .FirstOrDefaultAsync(x => x.UserName == userName && x.Password == password);
        }
        
        public Task<bool> IsPersonExists(string userName)
        {
            return _personalManagerContext.People.AsNoTracking()
                .AnyAsync(x => x.UserName == userName);
        }
    }
}