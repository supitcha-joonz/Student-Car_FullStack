using StudentAPI.Models;

namespace StudentAPI.Repositories
{
    public interface IStudentsTableRepository
    {
        Task<IEnumerable<StudentsTable>> GetAll();

        Task<IEnumerable<StudentsTable>> GetByUserId(int id);

        Task<StudentsTable> GetById(int id);
        Task<int> Add(StudentsTable studentsTable);
        Task<int> Update(StudentsTable studentsTable);
        Task<int> Delete(int id);
    }
}
