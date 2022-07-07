using StudentAPI.Models;

namespace StudentAPI.Services
{
    public interface IStudentsTableService
    {
        Task<IEnumerable<StudentsTable>> GetAll();

        Task<IEnumerable<StudentsTable>> GetByUserId(int id);

        Task<StudentsTable> GetById(int id);
        Task<bool> Add(StudentsTable studentsTable);
        Task<bool> Update(StudentsTable studentsTable);
        Task<bool> Delete(int id);
    }
}
