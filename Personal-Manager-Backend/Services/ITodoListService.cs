using System.Threading.Tasks;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services
{
    public interface ITodoListService
    {
        Task<int> AddTodoItem(TodoRequest request);
    }
}