using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Personal_Manager_Backend.Repositories;
using Personal_Manager_Backend.Repositories.Classes;
using Personal_Manager_Backend.Repositories.Interfaces;
using Personal_Manager_Backend.Services;
using Personal_Manager_Backend.Services.Classes;
using Personal_Manager_Backend.Services.Interfaces;

namespace Personal_Manager_Backend
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddControllers();
            services.AddCors(c =>
            {
                c.AddPolicy("AllowAnyOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });

            var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("Secret"));
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    SaveSigninToken = true
                };
            });
            services.AddHttpContextAccessor();

            services.AddDbContext<PersonalManagerContext>(options =>
                options.UseSqlServer(_configuration.GetConnectionString("PersonalManager")));
            services.AddScoped<IExpenseService, ExpenseService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ITodoListService, TodoListService>();
            services.AddScoped<IPersonService, PersonService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            
            services.AddScoped<IExpenseRepository, ExpenseRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ITodoListRepository, TodoListRepository>();
            services.AddScoped<IPersonRepository, PersonRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler(appError => appError.Run(async context =>
            {
                var exception = context.Features
                    .Get<IExceptionHandlerPathFeature>()
                    .Error;
                await context.Response.WriteAsJsonAsync(exception.Message);
            }));
            app.UseCors("AllowAnyOrigin");
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}