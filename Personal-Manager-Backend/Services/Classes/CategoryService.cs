using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Personal_Manager_Backend.Repositories;
using Personal_Manager_Backend.Repositories.Interfaces;
using Personal_Manager_Backend.Services.Interfaces;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services.Classes
{
    public class CategoryService: ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        
        public async Task<List<CategoryViewModel>> GetAllCategories()
        {
            var categoriesDto = await _categoryRepository.GetAllCategories();
            return categoriesDto.Select(x => new CategoryViewModel
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }
    }
}