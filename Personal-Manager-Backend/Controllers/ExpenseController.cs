using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal_Manager_Backend.Services.Interfaces;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Controllers
{
    [ApiController]
    public class ExpenseController
    {
        private readonly IExpenseService _expenseService;
        private readonly ICurrentUserService _currentUserService;

        public ExpenseController(IExpenseService expenseService, ICurrentUserService currentUserService)
        {
            _expenseService = expenseService;
            _currentUserService = currentUserService;
        }

        [Authorize]
        [HttpPost("[Controller]/[Action]")]
        public async Task<int> Add([FromBody] ExpenseRequest request)
        {
            return await _expenseService.AddExpense(request);
        }
        
        [Authorize]
        [HttpGet("[Controller]/[Action]")]
        public async Task<LimitedResultOfExpenseViewModel> GetLimitedExpenseList([FromQuery] int[] categoryIds, [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate, [FromQuery] int pageIndex, [FromQuery] int pageSize)
        {
           return await _expenseService.GetLimitedExpenseList(categoryIds, startDate, endDate, pageIndex, pageSize);
        }
        
        [Authorize]
        [HttpGet("[Controller]/[Action]")]
        public Task<List<ExpenseViewModel>> GetFilteredExpenseList([FromQuery] int[] categoryIds, [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            return  _expenseService.GetFilteredExpenseList(categoryIds, startDate, endDate);
        }
        
        
    }
}