using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Personal_Manager_Backend.Services;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Controllers
{
    [ApiController]
    public class CategoryController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet("[Controller]/[Action]")]
        public async Task<List<CategoryViewModel>> GetCategories()
        {
            return await _categoryService.GetAllCategories();
        }
    }
}