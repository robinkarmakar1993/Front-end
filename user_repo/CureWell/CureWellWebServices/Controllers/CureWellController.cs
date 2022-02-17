using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CureWellWebServices.Models;
using CureWellDataAccessLayer;
using CureWellDataAccessLayer.Models;
using System.Linq;

namespace CureWellWebServices.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CureWellController : Controller
    {
        private readonly ICureWellRepository _repObj;

        #region Do not modify
        public CureWellController(ICureWellRepository repObj)
        {
            _repObj = repObj;
        }
        #endregion

        #region FetchAllDoctors - Do not modify the signature
      
        public JsonResult FetchAllDoctors()
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            List<Models.Doctor> listOfDoctors = new List<Models.Doctor>();
            try
            {
                var doctorsList = _repObj.GetAllDoctors();
                if (doctorsList.Any())
                {
                    foreach (var item in doctorsList)
                    {
                        listOfDoctors.Add(new Models.Doctor()
                        {
                            DoctorId = item.DoctorId,
                            DoctorName = item.DoctorName
                        });
                    }
                }
            }
            catch (Exception)
            {
                listOfDoctors = null;
            }
            return Json(listOfDoctors);
        }
        #endregion

        #region FetchAllSurgeryDetails - Do not modify the signature
     
        public JsonResult FetchAllSurgeryDetails()
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            return Json(0);
        }
        #endregion

        #region UpdateSurgeryDetails - Do not modify the signature
      
        public bool UpdateSurgeryDetails(Models.Surgery sObj)
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            return false;
        }
        #endregion
    }
}