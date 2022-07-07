using StudentAPI.Models;

namespace StudentAPI.Services
{
    public interface ICarsTableService
    {
        Task<IEnumerable<CarsTable>> GetAll();

        Task<IEnumerable<CarsTable>> GetByUserId(int id);

        Task<CarsTable> GetById(int id);
        Task<bool> Add(CarsTable carsTable);
        Task<bool> Update(CarsTable carsTable);
        Task<bool> Delete(int id);
    }
}
