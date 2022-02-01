using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Personal_Manager_Backend.DataModels;

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

        public async Task<List<Expense>> GetExpenseList(int[] categoryIds, DateTime startDate, DateTime endDate)
        {
            return await _personalManagerContext.Expenses
                .Include(x=>x.Category)
                .Where(x => categoryIds.Contains(x.CategoryId) && x.CreatedDate >= startDate && x.CreatedDate <= endDate)
                .ToListAsync();
        }
    }
}