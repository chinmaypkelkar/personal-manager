using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.Repositories;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services
{
    public class TodoListService: ITodoListService
    {
        private readonly ITodoListRepository _todoListRepository;

        public TodoListService(ITodoListRepository todoListRepository)
        {
            _todoListRepository = todoListRepository;
        }
        public async Task<int> AddTodoItem(TodoRequest request)
        {
            var todoRequest = new TodoList
            {
                Name = request.Name,
                CreatedDate = request.CreatedDate
            };

            return await _todoListRepository.AddTodoItem(todoRequest);
            
        }
    }
}