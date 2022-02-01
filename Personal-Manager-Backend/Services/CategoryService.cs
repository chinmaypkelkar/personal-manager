using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Personal_Manager_Backend.Repositories;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services
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
            var categoriesDTO = await _categoryRepository.GetAllCategories();
            return categoriesDTO.Select(x => new CategoryViewModel
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
            
        }
    }
}