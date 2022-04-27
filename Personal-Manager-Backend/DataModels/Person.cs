using System.Collections.Generic;

#nullable disable

namespace Personal_Manager_Backend.DataModels
{
    public sealed partial class Person
    {
        public Person()
        {
            Expenses = new HashSet<Expense>();
            TodoList = new HashSet<TodoList>();
        }

        public int PersonId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        
        public ICollection<Expense> Expenses { get; set; }
        public ICollection<TodoList> TodoList { get; set; }
    }
}
