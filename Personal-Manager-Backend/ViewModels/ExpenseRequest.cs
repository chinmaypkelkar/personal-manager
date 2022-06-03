using System;

namespace Personal_Manager_Backend.ViewModels
{
    public class ExpenseRequest
    {
        public int CategoryId { get; set; }
        public int PersonId { get; set; }
        public string Expense { get; set; }
        public int Amount { get; set; }
        public DateTime CreatedDate { get; set; } 
        
    }
}