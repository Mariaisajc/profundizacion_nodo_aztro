using AztroWebApplication.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace AztroWebApplication.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        return Ok("Get All Users");

    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        return Ok("Get User By Id" + id);

    }

    [HttpPost]
    public IActionResult CreateUser()
    {
        return Ok("Create User");

    }

    [HttpPut("{id}")]
    public IActionResult UpdateUserById(int id)
    {
        return Ok("Update User" + id);

    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUserById(int id)
    {
        return Ok("Delete User" + id);

    }
}
    