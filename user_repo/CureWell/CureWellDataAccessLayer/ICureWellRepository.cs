using System;
using System.Collections.Generic;
using System.Text;
using CureWellDataAccessLayer.Models;

namespace CureWellDataAccessLayer
{
    public interface ICureWellRepository
    {
        List<Doctor> GetAllDoctors();

        List<Surgery> GetAllSurgeryDetails();

        bool UpdateSurgeryDetails(Surgery sObj);


    }
}
