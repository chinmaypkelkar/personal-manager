using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.Repositories;
using Personal_Manager_Backend.Repositories.Interfaces;
using Personal_Manager_Backend.Services.Interfaces;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services.Classes
{
    public class ExpenseService: IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly ICurrentUserService _currentUserService;

        public ExpenseService(IExpenseRepository expenseRepository, ICurrentUserService currentUserService)
        {
            _expenseRepository = expenseRepository;
            _currentUserService = currentUserService;
        }
        public async Task<int> AddExpense(ExpenseRequest request)
        {
            Validate(request);
            request.PersonId = GetPersonId();
            var expense = new Expense
            {
                CategoryId = request.CategoryId,
                PersonId = request.PersonId,
                Name = request.Expense,
                Amount = request.Amount,
                CreatedDate = request.CreatedDate
            };

            return await _expenseRepository.AddExpense(expense);
        }
        
        private static void Validate(ExpenseRequest request)
        {
            if (string.IsNullOrEmpty(request.Expense))
            {
                throw new Exception($"{nameof(request.Expense)} can't be null or empty");
            }
        }

        public async Task<LimitedResultOfExpenseViewModel> GetLimitedExpenseList(int[] categoryIds, DateTime startDate,
            DateTime endDate, int pageIndex, int pageSize)
        {
            var personId = GetPersonId();
            return await _expenseRepository.GetLimitedExpenseList(personId,categoryIds, startDate, endDate, pageIndex, pageSize);
        }

        public async Task<List<ExpenseViewModel>> GetFilteredExpenseList(int[] categoryIds, DateTime startDate, DateTime endDate)
        {
            var personId = GetPersonId();
            var expenses =  await _expenseRepository.GetFilteredExpenseList(personId,categoryIds, startDate, endDate);
            return expenses.Select(x => new ExpenseViewModel
            {
                Expense = x.Name,
                Category = x.Category.Name,
                Amount = x.Amount,
                CreatedDate = x.CreatedDate
            }).ToList();
        }

        private int GetPersonId()
        {
            var personId = _currentUserService.GetPersonId();
            return int.TryParse(personId, out var parsedId) ? parsedId : throw new Exception("can't parse personId");
        }
    }
}