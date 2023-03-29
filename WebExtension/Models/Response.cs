using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebExtension.Models
{
	public class Response
	{

        public int? respondeId { set; get; }
        public int iconId { set; get; }
        public int employeeId { set; get; }
		public DateTime? responseTime { set; get; }


        public Response(int rid, int icon, int eid, DateTime time)
		{
			respondeId = rid;
			iconId = icon;
			employeeId = eid;
			responseTime = time; 
 		}
        [JsonConstructor]
        public Response()
        {
        }


    }
}

