using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Grpc.Course.Protobuf.Test;

Console.WriteLine("Welcome to Protobuf test!");

var emp = new Employee();
emp.FirstName = "Memi";
emp.LastName = "Lavi";
emp.IsRetired = false;

var birthdate = new DateTime(1976, 7, 9);
birthdate = DateTime.SpecifyKind(birthdate, DateTimeKind.Utc);
emp.BirthDate = Timestamp.FromDateTime(birthdate);
emp.MaritalStatus = Employee.Types.MaritalStatus.Married;
emp.PreviousEmployers.Add("Microsoft");
emp.PreviousEmployers.Add("HP");
emp.CurrentAddress = new Address();
emp.CurrentAddress.City = "New York";
emp.CurrentAddress.StreetName = "5th Avenue";
emp.CurrentAddress.HouseNumber = 42;

using (var output = File.Create("emp.dat"))
{
  emp.WriteTo(output);
}

Employee empFromFile;

using (var input = File.OpenRead("emp.dat"))
{
  empFromFile = Employee.Parser.ParseFrom(input);
}

Console.WriteLine("Protobuf test complete :-)");