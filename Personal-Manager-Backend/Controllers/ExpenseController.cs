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
        public async Task<LimitedResultOfExpenseViewModel> GetLimitedExpenseList([FromQuery] int[] categoryIds, [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate, [FromQuery] int pageIndex, [FromQuery] int pageSize)
        {
            var test = await _expenseService.GetLimitedExpenseList(categoryIds, startDate, endDate, pageIndex, pageSize);
            return test;
        }
        
        [HttpGet("[Controller]/[Action]")]
        public Task<List<ExpenseViewModel>> GetFilteredExpenseList([FromQuery] int[] categoryIds, [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            return  _expenseService.GetFilteredExpenseList(categoryIds, startDate, endDate);
        }
    }
}