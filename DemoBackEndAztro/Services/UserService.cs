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

    // Imprime un mensaje de éxito y retorna el usuario creado
    Console.WriteLine("Usuario creado exitosamente.");
    return createdUser;
}


        public async Task<User> UpdateUser(int id, User user)
        {
            var updatedUser = await userRepository.UpdateUser(id, user);
            if (updatedUser == null)
            {
                throw new InvalidOperationException("User not found.");
            }
            return updatedUser;
        }

        public async Task<User?> DeleteUserById(int id)
        {
            return await userRepository.DeleteUserById(id);
        }
    }
}