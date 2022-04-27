using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.Repositories.Interfaces;

namespace Personal_Manager_Backend.Repositories.Classes
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

        public async Task<List<string>> GetFilteredTodoList(int personId, DateTime createdDate)
        {
            return await _personalManagerContext.TodoLists
                .AsNoTracking()
                .Where(x=> DateTime.Compare(x.CreatedDate.Date, createdDate.Date)  <= 0 && x.PersonId == personId)
                .Select(x => x.Name)
                .ToListAsync();
        }
    }
}