using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Personal_Manager_Backend.Services;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Controllers
{
    public class ToDoListController
    {
        private readonly ITodoListService _todoListService;

        public ToDoListController(ITodoListService todoListService)
        {
            _todoListService = todoListService;
        }
        
        [HttpPost("[Controller]/[Action]")]
        public Task<int> AddTodoItem([FromBody] TodoRequest request)
        {
            return _todoListService.AddTodoItem(request);
        }
    }
}