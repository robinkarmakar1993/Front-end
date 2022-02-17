using System;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using CureWellDataAccessLayer.Models;
using Remotion.Linq.Clauses.ResultOperators;

namespace CureWellDataAccessLayer
{
    public class CureWellRepository:ICureWellRepository
    {

        public static List<Doctor> DoctorList { get; set; }
        public static List<Surgery> SurgeryList { get; set; }

        #region CureWellRepository - Do not modify 
        public CureWellRepository()
        {
        }
        #endregion

        #region Static Constructor-Do not modify
        static CureWellRepository()
        {
            DoctorList = new List<Doctor>();
            SurgeryList = new List<Surgery>();


            DoctorList.AddRange(
               new List<Doctor>()
               {
                    new Doctor() {DoctorId="D001", DoctorName="George", DoctorSpecialization="Anesthesiologist"},
                    new Doctor() {DoctorId="D002", DoctorName="Simon", DoctorSpecialization="Cardiologist"},
                    new Doctor() {DoctorId="D003", DoctorName="Peter", DoctorSpecialization="Dentist"}
               }
               );

            SurgeryList.AddRange(
                new List<Surgery>()
                {
                    new Surgery(){ SurgeryId=1,DoctorId="D001",SurgeryDate=new DateTime(2020,09,01),StartTime="09:00:00",EndTime="14:00:00", SurgeryCategory="ANE"},
                    new Surgery(){ SurgeryId=2,DoctorId="D002",SurgeryDate=new DateTime(2020,10,01),StartTime="10:00:00",EndTime="16:00:00", SurgeryCategory="CAR"},
                    new Surgery(){ SurgeryId=3,DoctorId="D003",SurgeryDate=new DateTime(2020,10,05),StartTime="09:30:00",EndTime="11:00:00", SurgeryCategory="DEN"},

                }
                );
        } 
        #endregion

        #region GetAllDoctors - Do not modify the signature
        public List<Doctor> GetAllDoctors()
            {
                //To Do: Implement appropriate logic and change the return statement as per your logic
                List<Doctor> doctors = new List<Doctor>();
                try
                {
                    doctors = DoctorList.Select(x => x).ToList<Doctor>();
            }
                catch (Exception)
                {
                    doctors = null;
                }
                return doctors;
            }

            #endregion

        #region GetAllSurgeryDetails - Do not modify the signature
            public List<Surgery> GetAllSurgeryDetails()
            {
                //To Do: Implement appropriate logic and change the return statement as per your logic
                List<Surgery> lstSurgeries = new List<Surgery>();
                try
                {
                    lstSurgeries = SurgeryList.Select(x => x).ToList<Surgery>();
                }
                catch (Exception)
                {
                    lstSurgeries = null;
                }

                return lstSurgeries;
            }

            #endregion

        #region UpdateSurgeryDetails - Do not modify the signature
            public bool UpdateSurgeryDetails(Surgery sObj)
            {
                //To Do: Implement appropriate logic and change the return statement as per your logic
      
                bool status = false;
                try
                {
                    foreach (var newSurgery in SurgeryList)
                    {
                        if (newSurgery.SurgeryId == sObj.SurgeryId)
                        {

                        newSurgery.DoctorId = sObj.DoctorId;
                        newSurgery.StartTime = sObj.StartTime;
                        newSurgery.EndTime = sObj.EndTime;
                        newSurgery.SurgeryCategory = sObj.SurgeryCategory;
                        newSurgery.SurgeryDate = sObj.SurgeryDate;
                        
                        return true;
                        }
                    }
                }
                catch (Exception)
                {
                    status = false;
                }
                return status;
            }
            #endregion

    }
} 

