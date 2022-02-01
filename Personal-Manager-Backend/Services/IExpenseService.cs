using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services
{
    public interface IExpenseService
    {
        public Task<int> AddExpense(ExpenseRequest request);

        public Task<List<ExpenseViewModel>> GetExpenseList(int[] categoryId, DateTime startDate, DateTime endDate);
    }
}