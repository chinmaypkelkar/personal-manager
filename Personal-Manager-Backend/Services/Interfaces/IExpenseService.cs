using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services.Interfaces
{
    public interface IExpenseService
    {
        public Task<int> AddExpense(ExpenseRequest request);

        public Task<LimitedResultOfExpenseViewModel> GetLimitedExpenseList(int[] categoryId, DateTime startDate,
            DateTime endDate, int pageIndex, int pageSize);

        Task<List<ExpenseViewModel>> GetFilteredExpenseList(int[] categoryIds, DateTime startDate, DateTime endDate);
    }
}