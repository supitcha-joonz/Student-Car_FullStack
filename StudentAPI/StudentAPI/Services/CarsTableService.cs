using StudentAPI.Models;
using StudentAPI.Repositories;

namespace StudentAPI.Services
{
    public class CarsTableService : ICarsTableService
    {
        private readonly ICarsTableRepository _carsTableRepository;

        public CarsTableService(ICarsTableRepository carsTableRepository)
        {
            _carsTableRepository = carsTableRepository;
        }

        public async Task<IEnumerable<CarsTable>> GetByUserId(int id)
        {
            return await _carsTableRepository.GetByUserId(id);
        }
        public async Task<IEnumerable<CarsTable>> GetAll()
        {
            var carsTables = await _carsTableRepository.GetAll();
            var resp = carsTables.OrderByDescending(m => m.CarName);
            return resp;
        }

        public async Task<CarsTable> GetById(int id)
        {
            return await _carsTableRepository.GetById(id);
        }
        public async Task<bool> Add(CarsTable carsTable)
        {
            var carsTablesList = await _carsTableRepository.GetAll();
            var isDupicate = carsTablesList.Where(m => m.CarName == carsTable.CarName);
            if (isDupicate.Count() > 0)
            {
                throw new Exception("Error Problem is Dupicate");
            }
            return await _carsTableRepository.Add(carsTable) > 0;
        }
        public async Task<bool> Update(CarsTable carsTable)
        {
            var carsTablesList = await _carsTableRepository.GetAll();
            var isDupicate = carsTablesList.Where((m) => m.CarName == carsTable.CarName && m.Id != carsTable.Id);
            if (isDupicate.Count() > 0)
            {
                throw new Exception("Error Problem is Dupicate");
            }
            return await _carsTableRepository.Update(carsTable) > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var carsTable = await _carsTableRepository.GetById(id);
            if (carsTable == null)
            {
                throw new Exception("Error Problem not exist");
            }
            return await _carsTableRepository.Delete(id) > 0;
        }

        
    }
}
