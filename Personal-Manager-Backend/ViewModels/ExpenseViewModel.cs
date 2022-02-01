using System;

namespace Personal_Manager_Backend.ViewModels
{
    public class ExpenseViewModel
    {
        public string Expense { get; set; }
        public string Category { get; set; }
        public int Amount { get; set; }
        public DateTime CreatedDate { get; set; } 
    }
}