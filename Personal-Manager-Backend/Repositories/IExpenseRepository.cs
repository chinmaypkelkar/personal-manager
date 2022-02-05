using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Repositories
{
    public interface IExpenseRepository
    {
        Task<int> AddExpense(Expense expense);
        Task<LimitedResultOfExpenseViewModel> GetLimitedExpenseList(int[] categoryIds, DateTime startDate, DateTime endDate,
            int pageIndex, int pageSize);
        Task<List<Expense>> GetFilteredExpenseList(int[] categoryIds, DateTime startDate, DateTime endDate);
    }
}