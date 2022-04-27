using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Personal_Manager_Backend.DataModels;
using Personal_Manager_Backend.Repositories.Interfaces;

namespace Personal_Manager_Backend.Repositories.Classes
{
    public class CategoryRepository: ICategoryRepository
    {
        private readonly PersonalManagerContext _personalManagerContext;

        public CategoryRepository(PersonalManagerContext personalManagerContext)
        {
            _personalManagerContext = personalManagerContext;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _personalManagerContext.Categories.ToListAsync();
        }
    }
}