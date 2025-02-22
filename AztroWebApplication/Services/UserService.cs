using System.Threading.Tasks;
using AztroWebApplication.Data;
using AztroWebApplication.Models;
using AztroWebApplication.Repositories;

namespace AztroWebApplication.Services
{
    public class UserService
    {

        private readonly UserRepository userRepository;

        public UserService(ApplicationDbContext context)
        {
            userRepository = new UserRepository(context);
        }

        public async Task<List<User>> GetAllUsers()
        {
            // llama al repositorio para traer la informacion de la base de datos
            return await userRepository.GetAllUsers();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await userRepository.GetUserById(id);
        }

        public async Task<User> CreateUser(User user)
{
    // Verifica la edad del usuario
    var userIsValid = user.Age >= 18 ? true : throw new InvalidOperationException("El usuario debe tener al menos 18 años.");

    // Procede a crear el usuario si es válido
    var createdUser = await userRepository.CreateUser(user);

    Console.WriteLine("Usuario creado exitosamente.");
    return createdUser;
}


        public async Task<User> UpdateUser(int id, User user)
{
    var existingUser = await userRepository.GetUserById(id);
    if (existingUser == null)
    {
        throw new InvalidOperationException("User not found.");
    }

    // Condición ternaria para permitir la actualización de la edad solo si es >= 18
    existingUser.Age = user.Age >= 18 ? user.Age : throw new InvalidOperationException("Age must be at least 18.");

    // Actualizar otros campos del usuario
    existingUser.Name = user.Name;
    existingUser.Email = user.Email;

    var updatedUser = await userRepository.UpdateUser(id, existingUser)
    ?? throw new InvalidOperationException("Failed to update user.");

    return updatedUser;
}

        public async Task<User?> DeleteUserById(int id)
        {
            return await userRepository.DeleteUserById(id);
        }
    }
}