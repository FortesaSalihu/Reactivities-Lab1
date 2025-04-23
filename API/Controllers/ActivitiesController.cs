using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;
//(AppDbContext context) is primary constructor
public class ActivitiesController (AppDbContext context): BaseApiController
{

    //Get all activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }

    
    //{} means that it is a placeholder that will be replaced with the actual ID that we're gonna get from the route params
    //get a single activity
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
       var activity = await context.Activities.FindAsync(id);

       if(activity == null) return NotFound();

       return activity;
    }
}
