namespace Personal_Manager_Backend.Services.Interfaces
{
    public interface ICurrentUserService
    {
        string GetUserName();
        string GetPersonId();
    }
}