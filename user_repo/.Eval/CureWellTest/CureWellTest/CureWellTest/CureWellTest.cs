using System;
using Xunit;
using CureWellWebServices;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using CureWellWebServices.Controllers;
using System.Collections.Generic;
using Moq;
using CureWellDataAccessLayer;
using CureWellDataAccessLayer.Models;
using Newtonsoft.Json;

namespace CureWellTest
{
    public class CureWellTest
    {
        #region Data Annotations
        [Fact]
        public void DoctorId_Required_Doctor()
        {
            CureWellWebServices.Models.Doctor docObj = new CureWellWebServices.Models.Doctor();
            var property = docObj.GetType().GetProperty("DoctorId");
            var actual = property.GetCustomAttribute(typeof(RequiredAttribute));
            Assert.NotNull(actual);
        }
        [Fact]
        public void DoctorName_Not_Required_Doctor()
        {
            CureWellWebServices.Models.Doctor doctorObj = new CureWellWebServices.Models.Doctor();
            var property = doctorObj.GetType().GetProperty("DoctorName");
            var actual = property.GetCustomAttributes().Count();
            Assert.Equal(0, actual);
        }

        [Fact]
        public void DoctorSpecialization_Required_Doctor()
        {
            CureWellWebServices.Models.Doctor docObj = new CureWellWebServices.Models.Doctor();
            var property = docObj.GetType().GetProperty("DoctorSpecialization");
            var actual = property.GetCustomAttribute(typeof(RequiredAttribute));
            Assert.NotNull(actual);
        }

       

        [Fact]
        public void SurgeryId_Required_Surgery()
        {
            CureWellWebServices.Models.Surgery docObj = new CureWellWebServices.Models.Surgery();
            var property = docObj.GetType().GetProperty("SurgeryId");
            var actual = property.GetCustomAttribute(typeof(RequiredAttribute));
            Assert.NotNull(actual);
        }

        [Fact]
        public void StartTime_Not_Required_SurgeryDetail()
        {
            CureWellWebServices.Models.Surgery surgeryObj = new CureWellWebServices.Models.Surgery();
            var property = surgeryObj.GetType().GetProperty("StartTime");
            var actual = property.GetCustomAttributes().Count();
            Assert.Equal(0, actual);
        }

        [Fact]
        public void EndTime_Not_Required_Surgery()
        {
            CureWellWebServices.Models.Surgery surgeryObj = new CureWellWebServices.Models.Surgery();
            var property = surgeryObj.GetType().GetProperty("EndTime");
            var actual = property.GetCustomAttributes().Count();
            Assert.Equal(0, actual);
        }

        [Fact]
        public void DoctorId_Required_Surgery()
        {
            CureWellWebServices.Models.Surgery surgeryObj = new CureWellWebServices.Models.Surgery();
            var property = surgeryObj.GetType().GetProperty("DoctorId");
            var actual = property.GetCustomAttribute(typeof(RequiredAttribute));
            Assert.NotNull(actual);
        }

        [Fact]
        public void SurgeryDate_Required_Surgery()
        {
            CureWellWebServices.Models.Surgery surgeryObj = new CureWellWebServices.Models.Surgery();
            var property = surgeryObj.GetType().GetProperty("SurgeryDate");
            var actual = property.GetCustomAttribute(typeof(RequiredAttribute));
            Assert.NotNull(actual);
        }

        #endregion

        #region Http Declaratives

        [Fact]
        public void FetchAllDoctors_Http_DeclarativeTest()
        {
            Type appType = typeof(CureWellController);
            var methodInfo = appType.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly).ToList().Find(x => x.Name.Equals("FetchAllDoctors"));
            var attributes = methodInfo.GetCustomAttribute(typeof(Microsoft.AspNetCore.Mvc.HttpGetAttribute));

            Assert.NotNull(attributes);
        }

        [Fact]
        public void FetchAllSurgeryDetails_Http_DeclarativeTest()
        {
            Type appType = typeof(CureWellController);
            var methodInfo = appType.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly).ToList().Find(x => x.Name.Equals("FetchAllSurgeryDetails"));
            var attributes = methodInfo.GetCustomAttribute(typeof(Microsoft.AspNetCore.Mvc.HttpGetAttribute));

            Assert.NotNull(attributes);
        }



        [Fact]
        public void UpdateSurgeryDetails_Http_DeclarativeTest()
        {
            Type appType = typeof(CureWellController);
            var methodInfo = appType.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly).ToList().Find(x => x.Name.Equals("UpdateSurgeryDetails"));
            var attributes = methodInfo.GetCustomAttribute(typeof(Microsoft.AspNetCore.Mvc.HttpPutAttribute));

            Assert.NotNull(attributes);
        }

        [Fact]
        public void SurgeryCategory_Not_Required_Surgery()
        {
            CureWellWebServices.Models.Surgery surgeryObj = new CureWellWebServices.Models.Surgery();
            var property = surgeryObj.GetType().GetProperty("SurgeryCategory");
            var actual = property.GetCustomAttributes().Count();
            Assert.Equal(0, actual);
        }
        #endregion

        #region Methods

        //FetchAllDoctors
        [Fact]
        public void FetchAllDoctors_ReturnsList()
        {
            Mock<ICureWellRepository> mockRepo = new Mock<ICureWellRepository>();

            List<Doctor> lstDoctors = new List<Doctor>();
            lstDoctors.Add(new Doctor { DoctorId = "D001", DoctorName = "George", DoctorSpecialization = "Anesthesiologist" });
            lstDoctors.Add(new Doctor { DoctorId = "D002", DoctorName = "Simon", DoctorSpecialization = "Cardiologist" });
            lstDoctors.Add(new Doctor { DoctorId = "D003", DoctorName = "Peter", DoctorSpecialization = "Dentist" });

            mockRepo.Setup(repo => repo.GetAllDoctors()).Returns(lstDoctors);

            var controller = new CureWellController(mockRepo.Object);

            var result = controller.FetchAllDoctors();

            var listvar = result.Value;

            var actualResult = JsonConvert.SerializeObject(listvar).ToString();
      
            List<CureWellWebServices.Models.Doctor> lstServiceDoctors = new List<CureWellWebServices.Models.Doctor>();
            lstServiceDoctors.Add(new CureWellWebServices.Models.Doctor { DoctorId ="D001", DoctorName = "George", DoctorSpecialization = "Anesthesiologist" });
            lstServiceDoctors.Add(new CureWellWebServices.Models.Doctor { DoctorId ="D002", DoctorName = "Simon", DoctorSpecialization = "Cardiologist" });
            lstServiceDoctors.Add(new CureWellWebServices.Models.Doctor { DoctorId ="D003", DoctorName = "Peter", DoctorSpecialization = "Dentist" });

            var expectedResult = JsonConvert.SerializeObject(lstServiceDoctors).ToString();

            Assert.Equal(actualResult, expectedResult);

        }

        [Fact]
        public void FetchAllDoctors_ReturnsList_ListCount()
        {
            Mock<ICureWellRepository> mockRepo = new Mock<ICureWellRepository>();

            List<Doctor> lstDoctors = new List<Doctor>();
            lstDoctors.Add(new Doctor { DoctorId = "D001", DoctorName = "George", DoctorSpecialization = "Anesthesiologist" });
            lstDoctors.Add(new Doctor { DoctorId = "D002", DoctorName = "Simon", DoctorSpecialization = "Cardiologist" });
            lstDoctors.Add(new Doctor { DoctorId = "D003", DoctorName = "Peter", DoctorSpecialization = "Dentist" });

            mockRepo.Setup(repo => repo.GetAllDoctors()).Returns(lstDoctors);

            var controller = new CureWellController(mockRepo.Object);

            var result = controller.FetchAllDoctors();


            List<CureWellWebServices.Models.Doctor> listvar = (List<CureWellWebServices.Models.Doctor>)result.Value;

            var actualResult = listvar.Count;

            Assert.Equal(3, actualResult);

        }

        [Fact]
        public void FetchAllDoctors_throwsException()
        {
            var mockRepo = new Mock<ICureWellRepository>();

            mockRepo.Setup(repo => repo.GetAllDoctors()).Throws(new Exception());

            var controller = new CureWellController(mockRepo.Object);

            var result = controller.FetchAllDoctors();

            var actualResult = result.Value;

            List<CureWellWebServices.Models.Doctor> expectedResult = null;

            Assert.Equal(actualResult, expectedResult);
        }

        [Fact]
        public void FetchAllDoctors_returnsNull()
        {
            var mockRepo = new Mock<ICureWellRepository>();

            List<Doctor> lstDoctors = null;

            mockRepo.Setup(repo => repo.GetAllDoctors()).Returns(lstDoctors);

            var controller = new CureWellController(mockRepo.Object);

            var result = controller.FetchAllDoctors();

            var actualResult = result.Value;

            List<CureWellWebServices.Models.Doctor> expectedResult = null;


            Assert.Equal(actualResult, expectedResult);
        }

        //FetchAllSurgeryDetails
        [Fact]
        public void FetchAllSurgeryDetails_ReturnsList()
        {
            Mock<ICureWellRepository> mockRepo = new Mock<ICureWellRepository>();

            List<Surgery> lstSurgery = new List<Surgery>();
            lstSurgery.Add(new Surgery { SurgeryId=1,DoctorId="D001",SurgeryDate=new DateTime(2020,09,01),StartTime="09:00:00",EndTime="14:00:00", SurgeryCategory="ANE" });
            lstSurgery.Add(new Surgery { SurgeryId=2,DoctorId="D002",SurgeryDate=new DateTime(2020,10,01),StartTime="10:00:00",EndTime="16:00:00", SurgeryCategory="CAR"});
            lstSurgery.Add(new Surgery { SurgeryId=3,DoctorId="D003",SurgeryDate = new DateTime(2020, 10, 05), StartTime = "09:30:00", EndTime = "11:00:00", SurgeryCategory = "DEN" });

            mockRepo.Setup(repo => repo.GetAllSurgeryDetails()).Returns(lstSurgery);

            var controller = new CureWellController(mockRepo.Object);

            var result = controller.FetchAllSurgeryDetails();

            var listvar = result.Value;

            var actualResult = JsonConvert.SerializeObject(listvar).ToString();

            List<CureWellWebServices.Models.Surgery> lstSurgeryDetails = new List<CureWellWebServices.Models.Surgery>();
            lstSurgeryDetails.Add(new CureWellWebServices.Models.Surgery { SurgeryId=1,DoctorId="D001",SurgeryDate=new DateTime(2020,09,01),StartTime="09:00:00",EndTime="14:00:00", SurgeryCategory="ANE" });
            lstSurgeryDetails.Add(new CureWellWebServices.Models.Surgery { SurgeryId=2,DoctorId="D002",SurgeryDate=new DateTime(2020,10,01),StartTime="10:00:00",EndTime="16:00:00", SurgeryCategory="CAR"});
            lstSurgeryDetails.Add(new CureWellWebServices.Models.Surgery { SurgeryId=3,DoctorId="D003", SurgeryDate = new DateTime(2020, 10, 05), StartTime = "09:30:00", EndTime = "11:00:00", SurgeryCategory = "DEN" });

            var expectedResult = JsonConvert.SerializeObject(lstSurgeryDetails).ToString();

            Assert.Equal(actualResult, expectedResult);

        }

        [Fact]
        public void FetchAllSurgeryDetails_ReturnsList_ListCount()
        {
            Mock<ICureWellRepository> mockRepo = new Mock<ICureWellRepository>();

            List<Surgery> lstSurgery = new List<Surgery>();
            lstSurgery.Add(new Surgery { SurgeryId = 1, DoctorId = "D001", SurgeryDate = new DateTime(2020, 09, 01), StartTime = "09:00:00", EndTime = "14:00:00", SurgeryCategory = "ANE" });
            lstSurgery.Add(new Surgery { SurgeryId = 2, DoctorId = "D002", SurgeryDate = new DateTime(2020, 10, 01), StartTime = "10:00:00", EndTime = "16:00:00", SurgeryCategory = "CAR" });
            lstSurgery.Add(new Surgery { SurgeryId = 3, DoctorId = "D003", SurgeryDate = new DateTime(2020, 10, 05), StartTime = "09:30:00", EndTime = "11:00:00", SurgeryCategory = "DEN" });

            mockRepo.Setup(repo => repo.GetAllSurgeryDetails()).Returns(lstSurgery);

            var controller = new CureWellController(mockRepo.Object);

            var result = controller.FetchAllSurgeryDetails();


            List<CureWellWebServices.Models.Surgery> listvar = (List<CureWellWebServices.Models.Surgery>)result.Value;

            var actualResult = listvar.Count;

            Assert.Equal(3, actualResult);

        }

        [Fact]
        public void FetchAllSurgeryDetails_throwsException()
        {
            var mockRepo = new Mock<ICureWellRepository>();

            mockRepo.Setup(repo => repo.GetAllSurgeryDetails()).Throws(new Exception());

            var controller = new CureWellController(mockRepo.Object);

            var result = controller.FetchAllSurgeryDetails();

            var actualResult = result.Value;

            List<CureWellWebServices.Models.Doctor> expectedResult = null;

            Assert.Equal(actualResult, expectedResult);
        }

        [Fact]
        public void FetchAllSurgeryDetails_returnsNull()
        {
            var mockRepo = new Mock<ICureWellRepository>();

            List<Surgery> lstSurgery = null;

            mockRepo.Setup(repo => repo.GetAllSurgeryDetails()).Returns(lstSurgery);

            var controller = new CureWellController(mockRepo.Object);

            var result = controller.FetchAllSurgeryDetails();

            var actualResult = result.Value;

            List<CureWellWebServices.Models.Surgery> expectedResult = null;


            Assert.Equal(actualResult, expectedResult);
        }

        [Fact]
        public void UpdateSurgeryDetails_Success()
        {
            var mockRepo = new Mock<ICureWellRepository>();

            mockRepo.Setup(repo => repo.UpdateSurgeryDetails(It.IsAny<Surgery>())).Returns(true);

            var controller = new CureWellController(mockRepo.Object);

            var surgeryWebObj = new CureWellWebServices.Models.Surgery()
            {
                DoctorId = "D001",
                SurgeryId = 1,
                SurgeryDate = new DateTime(2020, 09, 01),
                StartTime = "09:00:00",
                EndTime = "14:00:00",
                SurgeryCategory="ANE"
            };
          
            var actualResult = controller.UpdateSurgeryDetails(surgeryWebObj);
            var expectedResult = true;
            Assert.Equal(actualResult, expectedResult);
        }

        [Fact]
        public void UpdateSurgeryDetails_Exception()
        {
            var mockRepo = new Mock<ICureWellRepository>();

            mockRepo.Setup(repo => repo.UpdateSurgeryDetails(It.IsAny<Surgery>())).Throws(new Exception());

            var controller = new CureWellController(mockRepo.Object);

            var surgeryWebObj = new CureWellWebServices.Models.Surgery()
            {
                DoctorId = "D001",
                SurgeryId =1,
                SurgeryDate = new DateTime(2020, 09, 01),
                StartTime = "09:00:00",
                EndTime = "14:00:00",
                SurgeryCategory = "ANE"
            };

            var actualResult = controller.UpdateSurgeryDetails(surgeryWebObj);

            var expectedResult = false;

            Assert.Equal(actualResult, expectedResult);
        }

        [Fact]
        public void UpdateSurgeryDetails_Failure()
        {
            var mockRepo = new Mock<ICureWellRepository>();

            mockRepo.Setup(repo => repo.UpdateSurgeryDetails(It.IsAny<Surgery>())).Returns(false);

            var controller = new CureWellController(mockRepo.Object);

            var surgeryWebObj = new CureWellWebServices.Models.Surgery()
            {
                DoctorId = "D001",
                SurgeryId = 1,
                SurgeryDate = new DateTime(2020, 09, 01),
                StartTime = "09:00:00",
                EndTime = "14:00:00",
                SurgeryCategory = "ANE"
            };

            var actualResult = controller.UpdateSurgeryDetails(surgeryWebObj);

            var expectedResult = false;

            Assert.Equal(actualResult, expectedResult);
        }


        #endregion
    }
}
