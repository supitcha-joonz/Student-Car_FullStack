using StudentAPI.Models;

namespace StudentAPI.Repositories
{
    public interface ICarsTableRepository
    {
        Task<IEnumerable<CarsTable>> GetAll();

        Task<IEnumerable<CarsTable>> GetByUserId(int id);

        Task<CarsTable> GetById(int id);
        Task<int> Add(CarsTable carsTable);
        Task<int> Update(CarsTable carsTable);
        Task<int> Delete(int id);
    }
}
