using System;
using System.Collections.Generic;

namespace CureWellDataAccessLayer.Models
{
    public class Surgery
    {
        public int SurgeryId { get; set; }
        public string DoctorId { get; set; }
        public DateTime SurgeryDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string SurgeryCategory { get; set; }

    }
}
