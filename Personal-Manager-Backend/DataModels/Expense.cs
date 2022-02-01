﻿using System;


namespace Personal_Manager_Backend.DataModels
{
    public class Expense
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual Category Category { get; set; }
    }
}
