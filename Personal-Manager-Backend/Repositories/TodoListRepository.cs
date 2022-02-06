using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;

namespace Personal_Manager_Backend.Repositories
{
    public class TodoListRepository: ITodoListRepository
    {
        private readonly PersonalManagerContext _personalManagerContext;

        public TodoListRepository(PersonalManagerContext personalManagerContext)
        {
            _personalManagerContext = personalManagerContext;
        }
        public async Task<int> AddTodoItem(TodoList todoRequest)
        {
            _personalManagerContext.TodoLists.Add(todoRequest);
            return await _personalManagerContext.SaveChangesAsync();
        }
    }
}