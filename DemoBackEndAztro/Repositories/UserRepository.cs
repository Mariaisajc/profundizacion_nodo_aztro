using AztroWebApplication.Models;
using AztroWebApplication.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AztroWebApplication.Repositories
{
    public class UserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext context)
        {
            dbContext = context;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await dbContext.User.ToListAsync();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await dbContext.User.FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<User> CreateUser(User user)
        {
            var newUser = dbContext.User.Add(user);
            await dbContext.SaveChangesAsync();
            return newUser.Entity;
        }

        public async Task<User?> UpdateUser(int id, User user)
        {
            var userToUpdate = dbContext.User.FirstOrDefault(u => u.Id == id);
            if (userToUpdate == null)
            {
                return null;
            }

            userToUpdate.Name = user.Name;
            userToUpdate.Email = user.Email;
            userToUpdate.Age = user.Age;

            await dbContext.SaveChangesAsync();
            return userToUpdate;
        }

        public async Task<User?> DeleteUserById(int id)
        {
            var userToDelete = dbContext.User.FirstOrDefault(u => u.Id == id);
            if (userToDelete == null)
            {
                return null;
            }

            dbContext.User.Remove(userToDelete);
            await dbContext.SaveChangesAsync();
            return userToDelete;
        }
    }
}