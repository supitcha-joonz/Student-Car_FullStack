using Dapper;
using Microsoft.Data.SqlClient;
using StudentAPI.Models;
using StudentAPI.Repositories.GenericRepository;

namespace StudentAPI.Repositories
{
    public class StudentsTableRepository : GenericRepository<StudentsTable>, IStudentsTableRepository
    {
        private readonly IConfiguration _configuration;
        public StudentsTableRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public async Task<IEnumerable<StudentsTable>> GetByUserId(int id)
        {
            using (var db = new SqlConnection(connectionStrings))
            {
                var sqlCommand = string.Format(@"SELECT * FROM [StudentsTable] WHERE [Id] = @Id");
                var resp =  await db.QueryAsync<StudentsTable>(sqlCommand, new { Id = id });
                return resp.ToList();
            }
        }

        public override async Task<int> Add(StudentsTable studentsTable)
        {
            using (var db = new SqlConnection(connectionStrings))
            {
                var sqlCommand = string.Format(@"INSERT INTO [StudentsTable]
                                                               ([Name]
                                                               ,[Address]
                                                               ,[Email]
                                                               ,[Contact])
                                                         VALUES
                                                               (@Name
                                                               ,@Address
                                                               ,@Email
                                                               ,@Contact)");
                return await db.ExecuteAsync(sqlCommand, ParameterMapping(studentsTable));
            }
        }


        public override async Task<int> Update(StudentsTable studentsTable)
        {
            using (var db = new SqlConnection(connectionStrings))
            {
                var sqlCommand = string.Format(@"UPDATE [StudentsTable]
                                                   SET [Name] = @Name
                                                      ,[Address] = @Address
                                                      ,[Email] = @Email
                                                      ,[Contact] = @Contact
                                                 WHERE [Id] = @Id");
                return await db.ExecuteAsync(sqlCommand, ParameterMapping(studentsTable));
            }
        }

        public override async Task<int> Delete(int id)
        {
            using (var db = new SqlConnection(connectionStrings))
            {
                var sqlCommand = string.Format(@"DELETE FROM [StudentsTable] WHERE [id] = @Id");
                return await db.ExecuteAsync(sqlCommand, new { Id = id });
            }
        }

        private Object ParameterMapping(StudentsTable studentsTable)
        {
            return new
            {
                Id = studentsTable.Id,
                Name = studentsTable.Name,
                Address = studentsTable.Address,
                Email = studentsTable.Email,
                Contact = studentsTable.Contact
            };
        }

      
    }
}
