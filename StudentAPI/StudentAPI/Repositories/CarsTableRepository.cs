using Dapper;
using Microsoft.Data.SqlClient;
using StudentAPI.Models;
using StudentAPI.Repositories.GenericRepository;

namespace StudentAPI.Repositories
{
    public class CarsTableRepository : GenericRepository<CarsTable>, ICarsTableRepository
    {
        private readonly IConfiguration _configuration;
        public CarsTableRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public async Task<IEnumerable<CarsTable>> GetByUserId(int id)
        {
            using (var db = new SqlConnection(connectionStrings))
            {
                var sqlCommand = string.Format(@"SELECT * FROM [CarsTable] WHERE [FK_StudentId] = @FK_StudentId");
                var resp = await db.QueryAsync<CarsTable>(sqlCommand, new { FK_StudentId = id });
                return resp.ToList();
            }
        }


        public override async Task<int> Add(CarsTable carsTable)
        {
            using (var db = new SqlConnection(connectionStrings))
            {
                var sqlCommand = string.Format(@"INSERT INTO [CarsTable]
                                                               ([CarName]
                                                               ,[Brand]
                                                               ,[Price]
                                                               ,[FK_StudentId]
                                                               ,[RemainDebt])
                                                         VALUES
                                                               (@CarName
                                                               ,@Brand
                                                               ,@Price
                                                               ,@FK_StudentId
                                                               ,@RemainDebt)");
                return await db.ExecuteAsync(sqlCommand, ParameterMapping(carsTable));
            }
        }

       

        public override async Task<int> Update(CarsTable carsTable)
        {
            using (var db = new SqlConnection(connectionStrings))
            {
                var sqlCommand = string.Format(@"UPDATE [CarsTable]
                                                       SET [CarName] = @CarName
                                                          ,[Brand] = @Brand
                                                          ,[Price] = @Price
                                                          ,[FK_StudentId] = @FK_StudentId
                                                          ,[RemainDebt] = @RemainDebt
                                                 WHERE [Id] = @Id");
                return await db.ExecuteAsync(sqlCommand, ParameterMapping(carsTable));
            }
        }

        public override async Task<int> Delete(int id)
        {
            using (var db = new SqlConnection(connectionStrings))
            {
                var sqlCommand = string.Format(@"DELETE FROM [CarsTable] WHERE [id] = @Id");
                return await db.ExecuteAsync(sqlCommand, new { Id = id });
            }
        }

        private Object ParameterMapping(CarsTable carsTable)
        {
            return new
            {
                Id = carsTable.Id,
                CarName = carsTable.CarName,
                Brand = carsTable.Brand,
                Price = carsTable.Price,
                RemainDebt = carsTable.RemainDebt,
                FK_StudentId = carsTable.FK_StudentId

            };
        }

       
    }
}
