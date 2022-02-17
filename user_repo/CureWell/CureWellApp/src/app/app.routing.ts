import { RouterModule } from '@angular/router';
import { ViewDoctorComponent } from './curewell-components/view-doctor/view-doctor.component';
import { ViewSurgeryDetailsComponent } from './curewell-components/view-surgery-details/view-surgery-details.component';
import { UpdateSurgeryComponent } from './curewell-components/update-surgery/update-surgery.component';


export var routing = RouterModule.forRoot([
  { path: 'viewDoctors', component: ViewDoctorComponent },
  { path: 'viewSurgeryDetails', component: ViewSurgeryDetailsComponent },
  { path: 'editSurgery/:surgeryId/:doctorId/:surgeryDate/:startTime/:endTime/:surgeryCategory', component: UpdateSurgeryComponent },
  { path: '**', component: ViewDoctorComponent }

])
