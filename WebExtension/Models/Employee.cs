using System;
using System.ComponentModel.DataAnnotations;

namespace WebExtension.Models
{
	public class Employee
	{
        public int employeeId { set; get; }
		public string? employeeFirstName { set; get; }
		public string? employeeLastName { set; get; }


		public Employee(int id, string firstName, string lastName)
		{
			employeeId = id; 
			employeeFirstName = firstName;
			employeeLastName = lastName;
		}
	}
}

