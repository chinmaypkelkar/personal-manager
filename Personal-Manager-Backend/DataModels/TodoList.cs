using System;

#nullable disable

namespace Personal_Manager_Backend.DataModels
{
    public partial class TodoList
    {
        public TodoList()
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        
        public int PersonId { get; set; }
        
    }
}
