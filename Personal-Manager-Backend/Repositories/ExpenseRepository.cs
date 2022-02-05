using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Repositories
{
    public class ExpenseRepository: IExpenseRepository
    {
        private readonly PersonalManagerContext _personalManagerContext;

        public ExpenseRepository(PersonalManagerContext personalManagerContext)
        {
            _personalManagerContext = personalManagerContext;
        }

        public async Task<int> AddExpense(Expense expense)
        {
            _personalManagerContext.Expenses.Add(expense);
            return await _personalManagerContext.SaveChangesAsync();
        }

        public async Task<LimitedResultOfExpenseViewModel> GetLimitedExpenseList(int[] categoryIds, DateTime startDate, DateTime endDate, int pageIndex, int pageSize)
        {
            var offset = pageIndex * pageSize;
            var query = GetExpensesQuery(categoryIds, startDate, endDate);
            var total = await query.CountAsync();
            var expenses =  await query
                .OrderBy(x=>x.Id)
                .Skip(offset)
                .Take(pageSize)
                .Select(x=> new ExpenseViewModel
                {
                    Expense = x.Name,
                    Category = x.Category.Name,
                    Amount = x.Amount,
                    CreatedDate = x.CreatedDate
                })
                .ToListAsync();

            return new LimitedResultOfExpenseViewModel(expenses,total, pageIndex, pageSize);
        }

        public async Task<List<Expense>> GetFilteredExpenseList(int[] categoryIds, DateTime startDate, DateTime endDate)
        {
            var query = GetExpensesQuery(categoryIds, startDate, endDate);
            return await query.ToListAsync();
        }

        private IQueryable<Expense> GetExpensesQuery(int[] categoryIds, DateTime startDate,
            DateTime endDate)
        {
            return _personalManagerContext.Expenses
                .Include(x => x.Category)
                .Where(x => categoryIds.Contains(x.CategoryId) && x.CreatedDate >= startDate &&
                            x.CreatedDate <= endDate);
        }
    }
}