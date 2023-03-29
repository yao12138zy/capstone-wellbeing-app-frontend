using System.Collections;
using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebExtension.DAO;
using WebExtension.Models;

namespace WebExtension.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [HttpGet("response/{eid}")]
    public IActionResult getResponsesById(int eid)
    {
        Database db = new Database();
        ArrayList responses;
        db.connect();
        try
        {
            responses = db.GetResponsesByEmployeeID(eid);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.StackTrace);
            throw new HttpRequestException(HttpStatusCode.NotFound.ToString());
        }
        finally
        {
            db.disconnect();
        }
        return new ObjectResult(responses);
    }
    [HttpGet("response/all")]
    public IActionResult getAllResponses()
    {
        Database db = new Database();
        ArrayList responses;
        db.connect();
        try
        {
            responses = db.GetResponsesEntries();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.StackTrace);
            throw new HttpRequestException(HttpStatusCode.BadRequest.ToString());
        }
        finally
        {
            db.disconnect();
        }
        return new ObjectResult(responses);
    }

    [HttpGet("response/group/{groupId}")]
    public IActionResult getResponseById(int groupId)
    {
        Database db = new Database();
        ArrayList responses;
        db.connect();
        try
        {
            responses = db.GetResponsesByGroupId(groupId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.StackTrace);
            throw new HttpRequestException(HttpStatusCode.NotFound.ToString());
        }
        finally
        {
            db.disconnect();
        }
        return new ObjectResult(responses); ;

    }
    [HttpPost("response/submit")]
    public IActionResult postResponse([FromBody] Response response)
    {

        Database db = new Database();
        db.connect();
        Console.WriteLine(response.ToString());
        response.responseTime = DateTime.Now;
        db.insert_reponse(response);
        return new ObjectResult(response);
        try
        {
            db.insert_reponse(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.StackTrace);
            throw new HttpRequestException(HttpStatusCode.BadRequest.ToString());
        }
        finally
        {
            db.disconnect();
        }
        return new ObjectResult(response);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

