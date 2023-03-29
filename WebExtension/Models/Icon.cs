using System;
using System.ComponentModel.DataAnnotations;

namespace WebExtension.Models
{
	public class Icon
	{
        public int iconId { set; get; }
        public String? description { set; get; }
        public String? img_filepath { set; get; }
        public Icon(int id, string desr, string path)
		{
			iconId = id; 
			description = desr;
			img_filepath = path; 
		}
	}
}

