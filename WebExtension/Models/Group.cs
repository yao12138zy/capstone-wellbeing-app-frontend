using System;
namespace WebExtension.Models
{
	public class Group
	{
		
		public int groupId { set; get; }
		public string? groupName { set; get; }
		public int managerId { set; get; }

		public Group(int id, string name, int mid) 
		{
			groupId = id;
			groupName = name;
			managerId = mid; 
		}
	}
}

