using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;

namespace Personal_Manager_Backend.Repositories
{
    public interface IExpenseRepository
    {
        Task<int> AddExpense(Expense expense);
        Task<List<Expense>> GetExpenseList(int[] categoryIds, DateTime startDate, DateTime endDate);
    }
}