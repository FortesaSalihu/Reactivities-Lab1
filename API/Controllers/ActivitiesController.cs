using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;
//(AppDbContext context) is primary constructor
public class ActivitiesController : BaseApiController
{

    //Get all activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    
    //{} means that it is a placeholder that will be replaced with the actual ID that we're gonna get from the route params
    //get a single activity
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
       return await Mediator.Send(new GetActivityDetails.Query{Id = id});
    }

    [HttpPost]

    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command{Activity = activity});
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command{Activity = activity});

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult>DeleteActivity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command{Id = id});

        return Ok();

    }
}
