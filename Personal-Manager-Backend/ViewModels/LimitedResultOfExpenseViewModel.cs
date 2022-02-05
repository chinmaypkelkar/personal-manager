using System.Collections.Generic;

namespace Personal_Manager_Backend.ViewModels
{
    public class LimitedResultOfExpenseViewModel
    {
        public IReadOnlyList<ExpenseViewModel> Expenses { get; }
        public  int PageIndex { get; }
        public int PageSize { get; }
        
        public int Total { get; }

        public LimitedResultOfExpenseViewModel(IReadOnlyList<ExpenseViewModel> expenses, int total, int pageIndex, int pageSize)
        {
            Expenses = expenses;
            Total = total;
            PageIndex = pageIndex;
            PageSize = pageSize;
        }
    }
}