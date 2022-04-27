using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.Repositories.Interfaces;
using Personal_Manager_Backend.Services.Interfaces;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services.Classes
{
    public class TodoListService: ITodoListService
    {
        private readonly ITodoListRepository _todoListRepository;
        private readonly ICurrentUserService _currentUserService;

        public TodoListService(ITodoListRepository todoListRepository, ICurrentUserService currentUserService)
        {
            _todoListRepository = todoListRepository;
            _currentUserService = currentUserService;
        }
        public async Task<int> AddTodoItem(TodoRequest request)
        {
            Validate(request);
            request.PersonId = GetPersonId();
            var todoRequest = new TodoList
            {
                Name = request.Name,
                PersonId = request.PersonId,
                CreatedDate = request.CreatedDate
            };

            return await _todoListRepository.AddTodoItem(todoRequest);
        }

        private static void Validate(TodoRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
            {
                throw new Exception($"{nameof(request.Name)} can't be null or empty");
            }
        }

        public async Task<List<string>> GetFilteredTodoList(DateTime createdDate)
        {
            var personId = GetPersonId();
            return await _todoListRepository.GetFilteredTodoList(personId,createdDate);
        }
        
        private int GetPersonId()
        {
            var personId = _currentUserService.GetPersonId();
            return int.TryParse(personId, out var parsedId) ? parsedId : throw new Exception("can't parse personId");
        }
    }
}