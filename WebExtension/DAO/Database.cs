using System;
using System.Collections;
using System.Data.SqlClient;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using WebExtension.Models;

namespace WebExtension.DAO
{
	public class Database
	{
        SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
        SqlConnection connection;
        bool connected = false; 

        public Database()
		{
            builder.DataSource = "localhost";   // update me
            builder.UserID = "sa";              // update me
            builder.Password = "Password123";      // update me
            builder.InitialCatalog = "TD_DB_TEST";
            connection = new SqlConnection(builder.ConnectionString);
        }

        public void connect()
        {
            Console.WriteLine("Trying to connect to database");
            try
            {
                this.connection.Open();
                connected = true; 
                Console.WriteLine("Connected to database");
                
            }
            catch (Exception e)
            {
                Console.WriteLine("Could not connect to database", e);
            }

        }

        public void disconnect()
        {
            Console.WriteLine("Trying to disconnect to database");
            try
            { 
                this.connection.Close();
                connected = false; 
                Console.WriteLine("Disconnected from database");
            }
            catch (Exception e)
            {
                Console.WriteLine("Could not disconnect to database", e);
            }
        }

        // INSERT into tables functions
        public void insert_employee (Employee employee)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT Employees (EmployeeID, EmployeeFirstName, EmployeeLastName) ");
            sb.Append("VALUES (@employeeid, @employeefirstname, @employeelastname);");
            String sql = sb.ToString();
            try
            {
                using (SqlCommand command = new SqlCommand(sql, this.connection))
                {
                    command.Parameters.AddWithValue("@employeeid", employee.employeeId);
                    command.Parameters.AddWithValue("@employeefirstname", employee.employeeFirstName);
                    command.Parameters.AddWithValue("@employeelastname", employee.employeeLastName);
                    int rowsAffected = command.ExecuteNonQuery();
                    Console.WriteLine(rowsAffected + " row(s) inserted");
                }

            } catch (Exception e)
            {
                Console.WriteLine("Could not insert employee", e);
            }

        }

        public void insert_icon(Icon icon)
        {
            Console.WriteLine(this.connection.State == System.Data.ConnectionState.Closed);
            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT Icons (IconID, IconDescription, IconImage) ");
            sb.Append("VALUES (@iconid, @icondescription, @iconimage);");
            String sql = sb.ToString();

            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                command.Parameters.AddWithValue("@iconid", icon.iconId);
                command.Parameters.AddWithValue("@icondescription", icon.description);
                command.Parameters.AddWithValue("@iconimage", icon.img_filepath);
                Console.WriteLine(command);
                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine(rowsAffected + " row(s) inserted");
            }
        }
        /*
        public void insert_hierarchy(Hierarchy hierarchy)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT Hierarchies (ParentGroupID, ChildGroupID) ");
            sb.Append("VALUES (@parentgroupid, @childgroupid);");
            String sql = sb.ToString();
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                command.Parameters.AddWithValue("@parentgroupid", hierarchy.parent);
                command.Parameters.AddWithValue("@childgroupid", hierarchy.child);
                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine(rowsAffected + " row(s) inserted");
            }
        }
        */
        public void insert_group(Group group)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT Groups (GroupID, GroupName, ManagerID) ");
            sb.Append("VALUES (@groupid, @groupname, @managerid);");
            String sql = sb.ToString();

            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                command.Parameters.AddWithValue("@groupid", group.groupId);
                command.Parameters.AddWithValue("@groupname", group.groupName);
                command.Parameters.AddWithValue("@managerid", group.managerId);
                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine(rowsAffected + " row(s) inserted");
            }
        }

        public void insert_reponse(Response response)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT Responses (IconID, EmployeeID, SubmittedOn) ");
            sb.Append("VALUES (@iconid, @employeeid, @submittedon);");
            String sql = sb.ToString();

            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                command.Parameters.AddWithValue("@employeeid", response.employeeId);
                command.Parameters.AddWithValue("@iconid", response.iconId);
                command.Parameters.AddWithValue("@submittedon", response.responseTime);
                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine(rowsAffected + " row(s) inserted");
            }
        }


        // ***************** Functions to GET Method
        public ArrayList GetEmployeeEntries()
        {
            ArrayList employees = new ArrayList();
            Console.WriteLine("Reading data from Employees table");
            String sql = "SELECT * FROM Employees;";
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employees.Add(new Employee(reader.GetInt32(0), reader.GetString(1), reader.GetString(2)));
                        Console.WriteLine("{0} {1} {2}", reader.GetInt32(0), reader.GetString(1), reader.GetString(2));
                    }
                }
            }
            return employees;
        }

        public Employee GetEmployeeById(int id)
        {
            Employee employee = null;
            Console.WriteLine("Get Employee by Id: " + id.ToString());
            StringBuilder sb = new StringBuilder();
            sb.Append("SELECT * FROM Employees WHERE EmployeeID = @eid;");
            String sql = sb.ToString();
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                command.Parameters.AddWithValue("@eid", id);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employee = new Employee(reader.GetInt32(0), reader.GetString(1), reader.GetString(2)); 
                    }
                }
            }

            return employee; 

        }

        public ArrayList GetIconsEntries()
        {
            ArrayList icons = new ArrayList();

            Console.WriteLine("Reading data from Icons table");
            String sql = "SELECT * FROM Icons;";
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        icons.Add(new Icon(reader.GetInt32(0), reader.GetString(1), reader.GetString(2)));
                        //Console.WriteLine("{0} {1} {2}", reader.GetInt32(0), reader.GetString(1), reader.GetString(2));
                    }
                }
            }
            return icons;
        }


        public ArrayList GetGroupsEntries()
        {
            ArrayList groups = new ArrayList();

            Console.WriteLine("Reading data from Groups table");
            String sql = "SELECT * FROM Groups;";
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        groups.Add(new Group(reader.GetInt32(0), reader.GetString(1), reader.GetInt32(2)));
                        //Console.WriteLine("{0} {1} {2}", reader.GetInt32(0), reader.GetString(1), reader.GetInt32(2));
                    }
                }
            }
            return groups;
        }
        /*
        public ArrayList GetHierarchiesEntries()
        {
            ArrayList hierarchies = new ArrayList();

            Console.WriteLine("Reading data from Hierarchies table");
            String sql = "SELECT * FROM Hierarchies;";
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        hierarchies.Add(new Hierarchy(reader.GetInt32(0), reader.GetInt32(1)));
                        //Console.WriteLine("{0} {1}", reader.GetInt32(0), reader.GetInt32(1));
                    }
                }
            }
            return hierarchies;
        }
        */

        public ArrayList GetResponsesEntries()
        {
            ArrayList responses = new ArrayList();

            Console.WriteLine("Reading data from Responses table");
            String sql = "SELECT * FROM Responses;";
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        responses.Add(new Response(reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2), reader.GetDateTime(3)));
                        //Console.WriteLine("{0} {1} {2} {3} {4}", reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2), reader.GetInt32(3), reader.GetString(4));
                    }
                }
            }
            return responses;
        }

        public ArrayList GetResponsesByEmployeeID(int eid)
        {
            ArrayList responses = new ArrayList();
            Console.WriteLine("Get responses by employee ID...");
            StringBuilder sb = new StringBuilder();
            sb.Append("SELECT * FROM Responses WHERE EmployeeID = @eid;");
            String sql = sb.ToString();
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                command.Parameters.AddWithValue("@eid", eid);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        responses.Add(new Response(reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2), reader.GetDateTime(3)));
                    }
                }
            }

            return responses;
        }

        public ArrayList GetResponsesByGroupId(int groupId)
        {
            ArrayList responses = new ArrayList();
            Console.WriteLine("Get responses by Group ID...");
            StringBuilder sb = new StringBuilder();
            sb.Append("SELECT * from GroupEmployeeRelations as ge, Responses as r where ge.EmployeeID = r.EmployeeID and ge.GroupID = @gid;");
            String sql = sb.ToString();
            using (SqlCommand command = new SqlCommand(sql, this.connection))
            {
                command.Parameters.AddWithValue("@gid", groupId);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        responses.Add(new Response(reader.GetInt32(2), reader.GetInt32(3), reader.GetInt32(0), reader.GetDateTime(5)));
                        //Console.WriteLine("{0} {1} {2} {3} {4}", reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2), reader.GetInt32(3), reader.GetInt32(4));
                    }
                }
            }

            return responses;

        }






    }
}

