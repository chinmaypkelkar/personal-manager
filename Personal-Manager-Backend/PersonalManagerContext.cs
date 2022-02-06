using Microsoft.EntityFrameworkCore;
using Personal_Manager_Backend.DataModels;

#nullable disable

namespace Personal_Manager_Backend
{
    public partial class PersonalManagerContext : DbContext
    {
        public PersonalManagerContext()
        {
        }

        public PersonalManagerContext(DbContextOptions<PersonalManagerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Expense> Expenses { get; set; }
        public virtual DbSet<TodoList> TodoLists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoList>(entity =>
            {
                entity.ToTable("TodoList");
                
            });
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Name");
            });

            modelBuilder.Entity<Expense>(entity =>
            {
                entity.ToTable("Expense");

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Expenses)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CategoryExpense");
            });
        }
    }
}
