using System.Collections.Generic;
using System.Threading.Tasks;
using Personal_Manager_Backend.DataModels;

namespace Personal_Manager_Backend.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategories();
    }
}