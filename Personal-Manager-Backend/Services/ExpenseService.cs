using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.Repositories;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services
{
    public class ExpenseService: IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseService(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }
        public async Task<int> AddExpense(ExpenseRequest request)
        {
            var expense = new Expense
            {
                CategoryId = request.CategoryId,
                Name = request.Expense,
                Amount = request.Amount,
                CreatedDate = request.CreatedDate
            };

            return await _expenseRepository.AddExpense(expense);
        }

        public async Task<List<ExpenseViewModel>> GetExpenseList(int[] categoryIds, DateTime startDate,
            DateTime endDate)
        {
            return (await _expenseRepository.GetExpenseList(categoryIds, startDate, endDate))
                .Select(x => new ExpenseViewModel
                {
                    Expense = x.Name,
                    Category = x.Category.Name,
                    Amount = x.Amount,
                    CreatedDate = x.CreatedDate
                }).ToList();
        }
    }
}