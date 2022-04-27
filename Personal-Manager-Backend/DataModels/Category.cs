using System.Collections.Generic;

#nullable disable

namespace Personal_Manager_Backend.DataModels
{
    public partial class Category
    {
        public Category()
        {
            Expenses = new HashSet<Expense>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Expense> Expenses { get; set; }
    }
}
