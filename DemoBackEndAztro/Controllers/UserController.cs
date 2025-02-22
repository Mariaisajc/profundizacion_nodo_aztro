using AztroWebApplication.Models;
using AztroWebApplication.Data;
using AztroWebApplication.Services;
using Microsoft.AspNetCore.Mvc;

namespace AztroWebApplication.Controllers;

[ApiController]
[Route("api/[controller]")]


public class UserController : ControllerBase
{
    private readonly UserService userService;

    public UserController(ApplicationDbContext context)
    {
        userService = new UserService(context);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await userService.GetAllUsers();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await userService.GetUserById(id);
        if (user == null)
        {
            return NotFound(new ErrorResponse { Message = "User not found", StatusCode = 404 });
        }

        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(User user)
    {
        var createdUser = await userService.CreateUser(user);
        return Created(nameof(GetUserById), createdUser);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, User user)
    {
        await userService.UpdateUser(id, user);
        return Ok(new {Message="User updated"});
    
    }
    

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserById(int id)
    {
        var user = await userService.DeleteUserById(id);
        if (user == null)
        {
            return NotFound(new ErrorResponse { Message = "User not found", StatusCode = 404 });
        }
        return Ok(new {Message="User deleted"});
    }
    }
