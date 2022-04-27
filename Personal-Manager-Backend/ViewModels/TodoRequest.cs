using System;

namespace Personal_Manager_Backend.ViewModels
{
    public class TodoRequest
    {
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        
        public int PersonId { get; set; }
        
    }
}