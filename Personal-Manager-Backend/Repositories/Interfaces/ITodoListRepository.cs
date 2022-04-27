using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;

namespace Personal_Manager_Backend.Repositories.Interfaces
{
    public interface ITodoListRepository
    {
        Task<int> AddTodoItem(TodoList todoRequest);
        Task<List<string>> GetFilteredTodoList(int personId, DateTime createdDate);
    }
}