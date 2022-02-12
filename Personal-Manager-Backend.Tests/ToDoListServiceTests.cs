using System;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Personal_Manager_Backend.Repositories;
using Personal_Manager_Backend.Services;
using Personal_Manager_Backend.ViewModels;
using Xunit;

namespace Personal_Manager_Backend.Tests
{
   
    public class ToDoListServiceTests
    {
        private readonly ITodoListService _todoListService;

        public ToDoListServiceTests()
        {
            var toDoListRepositoryMock = new Mock<ITodoListRepository>();
            _todoListService = new TodoListService(toDoListRepositoryMock.Object);
        }

        [Fact]
        public async Task AddTodoItem_Should_Throw_Error_When_Request_Name_Is_Null()
        {
            var request = new TodoRequest
            {
                Name = null,
                CreatedDate = DateTime.Now
            };

            var error = await Assert.ThrowsAsync<Exception>(async () => await _todoListService.AddTodoItem(request));
            error.Message.Should().Be("Name can't be null or empty");
        }
        
        [Fact]
        public async Task AddTodoItem_Should_Throw_Error_When_Request_Name_Is_Empty()
        {
            var request = new TodoRequest
            {
                Name = "",
                CreatedDate = DateTime.Now
            };

            var error = await Assert.ThrowsAsync<Exception>(async () => await _todoListService.AddTodoItem(request));
            error.Message.Should().Be("Name can't be null or empty");
        }
        
    }
}