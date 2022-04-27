using System;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Personal_Manager_Backend.Repositories.Interfaces;
using Personal_Manager_Backend.Services.Classes;
using Personal_Manager_Backend.Services.Interfaces;
using Personal_Manager_Backend.ViewModels;
using Xunit;

namespace Personal_Manager_Backend.Tests
{
    public class ExpenseServiceTests
    {
        private readonly IExpenseService _expenseService;
        
        public ExpenseServiceTests()
        {
            var expenseServiceRepositoryMock = new Mock<IExpenseRepository>();
            var currentUserServiceMock = new Mock<ICurrentUserService>();
            _expenseService = new ExpenseService(expenseServiceRepositoryMock.Object, currentUserServiceMock.Object);
        }
        
        [Fact]
        public async Task AddExpense_Should_Throw_Error_When_Request_Expense_Is_Null()
        {
            var request = new ExpenseRequest
            {
                Expense = null,
                CreatedDate = DateTime.Now
            };

            var error = await Assert.ThrowsAsync<Exception>(async () => await _expenseService.AddExpense(request));
            error.Message.Should().Be("Expense can't be null or empty");
        }
        
        [Fact]
        public async Task AddTodoItem_Should_Throw_Error_When_Request_Name_Is_Empty()
        {
            var request = new ExpenseRequest
            {
                Expense = "",
                CreatedDate = DateTime.Now
            };

            var error = await Assert.ThrowsAsync<Exception>(async () => await _expenseService.AddExpense(request));
            error.Message.Should().Be("Expense can't be null or empty");
        }

    }
}