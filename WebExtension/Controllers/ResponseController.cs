using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebExtension.DAO;
using WebExtension.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebExtension.Controllers
{
    [Route("api/response")]
    public class ResponseController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [Route("response/submit")]
        [HttpPost]
        public ActionResult<Response> PostResponse(Response response)
        {
            
            Database db = new Database();
            db.connect();
            try {
                db.insert_reponse(response);
            } catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                throw new HttpRequestException(HttpStatusCode.BadRequest.ToString());
            } finally
            {
                db.disconnect(); 
            }
            return new ObjectResult(response);
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

        /*
        [HttpGet("response/group/{groupId}")]
        public JsonResult getResponseById(int groupId)
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
            return Json(responses, JsonRequestBehavior.AllowGet);

        }
        */
    }
}

