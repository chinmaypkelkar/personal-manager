using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Personal_Manager_Backend.Services;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Controllers
{
    [ApiController]
    public class ExpenseController
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpPost("[Controller]/[Action]")]
        public Task<int> Add([FromBody] ExpenseRequest request)
        {
            return _expenseService.AddExpense(request);
        }
        
        [HttpGet("[Controller]/[Action]")]
        public Task<List<ExpenseViewModel>> GetExpenseList([FromQuery] int[] categoryIds, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            return _expenseService.GetExpenseList(categoryIds, startDate, endDate);
        }
    }
}