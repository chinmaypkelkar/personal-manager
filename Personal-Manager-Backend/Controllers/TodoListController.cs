using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal_Manager_Backend.Services;
using Personal_Manager_Backend.Services.Interfaces;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Controllers
{
    [ApiController]
    public class ToDoListController
    {
        private readonly ITodoListService _todoListService;

        public ToDoListController(ITodoListService todoListService)
        {
            _todoListService = todoListService;
        }
        
        [Authorize]
        [HttpPost("[Controller]/[Action]")]
        public Task<int> AddTodoItem([FromBody] TodoRequest request)
        {
            return _todoListService.AddTodoItem(request);
        }

        [Authorize]
        [HttpGet("[Controller]/[Action]")]
        public Task<List<string>> GetFilteredTodoList(DateTime createdDate)
        {
            return _todoListService.GetFilteredTodoList(createdDate);
        }
    }
}