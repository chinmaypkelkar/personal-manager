using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services.Interfaces
{
    public interface ITodoListService
    {
        Task<int> AddTodoItem(TodoRequest request);
        Task<List<string>> GetFilteredTodoList(DateTime createdDate);
    }
}