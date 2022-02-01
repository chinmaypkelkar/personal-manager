using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.ViewModels;

namespace Personal_Manager_Backend.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryViewModel>> GetAllCategories();
    }
}