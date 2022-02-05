using System;

namespace Personal_Manager_Backend.DataModels
{
    public class TodoList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}