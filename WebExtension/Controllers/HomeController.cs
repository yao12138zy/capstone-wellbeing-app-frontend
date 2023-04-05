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

    [HttpGet("response/{eid}/{days?}")]
    public IActionResult getResponsesById(int eid, int? days = null)
    {
        
        Database db = new Database();
        Double diff = days == null ? -7 : Convert.ToDouble(-1 * days);
        DateTime endTime = DateTime.Now;
        DateTime startTime = endTime.AddDays(diff);
        IDictionary<int, int> iconCount; 
        db.connect();
        try
        {
            iconCount = db.GetResponsesByEmployeeID(eid,startTime,endTime);
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
        return new ObjectResult(iconCount);
    }


    [HttpGet("response/group/{groupId}/{days?}")]
    public IActionResult getResponseByGroupId(int groupId, int? days = null)
    {
        Database db = new Database();
        Double diff = days == null ? -7 : Convert.ToDouble(-1 * days);
        DateTime endTime = DateTime.Now;
        DateTime startTime = endTime.AddDays(diff);
        IDictionary<int, int> iconCount;

        db.connect();
        try
        {
            iconCount = db.GetResponsesByGroupId(groupId, startTime, endTime);
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
        return new ObjectResult(iconCount);

    }
    [HttpPost("response/submit")]
    public IActionResult postResponse([FromBody] Response response)
    {

        Database db = new Database();
        db.connect();
        Console.WriteLine(response.ToString());
        response.responseTime = DateTime.Now;

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

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

