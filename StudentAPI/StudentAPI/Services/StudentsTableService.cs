using StudentAPI.Models;
using StudentAPI.Repositories;

namespace StudentAPI.Services
{
    public class StudentsTableService : IStudentsTableService
    {
        private readonly IStudentsTableRepository _studentsTableRepository;

        public StudentsTableService(IStudentsTableRepository studentsTableRepository)
        {
            _studentsTableRepository = studentsTableRepository;

        }


        public async Task<IEnumerable<StudentsTable>> GetAll()
        {
            var studentsTables = await _studentsTableRepository.GetAll();
            var resp = studentsTables.OrderByDescending(m => m.Name);
            return resp;
        }

        public async Task<IEnumerable<StudentsTable>> GetByUserId(int id)
        {

            return await _studentsTableRepository.GetByUserId(id);
            //var studentsTables = await _studentsTableRepository.GetByUserId(id);
            //var resp = studentsTables.OrderByDescending(m => m.Name);
            //return resp;
        }

        public async Task<StudentsTable> GetById(int id)
        {
            return await _studentsTableRepository.GetById(id);
        }

        public async Task<bool> Add(StudentsTable studentsTable)
        {
            var studentsTableList = await _studentsTableRepository.GetAll();
            var isDupicate = studentsTableList.Where(m => m.Name == studentsTable.Name);
            if (isDupicate.Count() > 0)
            {
                throw new Exception("Error Problem is Dupicate");
            }
            return await _studentsTableRepository.Add(studentsTable) > 0;
        }

        public async Task<bool> Update(StudentsTable studentsTable)
        {
            var studentsTableList = await _studentsTableRepository.GetAll();
            var isDupicate = studentsTableList.Where((m) => m.Name == studentsTable.Name && m.Id != studentsTable.Id);
            if (isDupicate.Count() > 0)
            {
                throw new Exception("Error Problem is Dupicate");
            }
            return await _studentsTableRepository.Update(studentsTable) > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var studentsTable = await _studentsTableRepository.GetById(id);
            if (studentsTable == null)
            {
                throw new Exception("Error Problem not exist");
            }
            return await _studentsTableRepository.Delete(id) > 0;
        }

        
    }
}
