import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurewellService } from '../app/curewell-services/curewell.service';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ViewDoctorComponent } from '../app/curewell-components/view-doctor/view-doctor.component';
import { ViewSurgeryDetailsComponent } from './curewell-components/view-surgery-details/view-surgery-details.component';
import { UpdateSurgeryComponent } from './curewell-components/update-surgery/update-surgery.component';
import { HttpClient, HttpHeaders, HttpClientModule } from "@angular/common/http";
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ViewDoctorComponent,
    ViewSurgeryDetailsComponent,
    UpdateSurgeryComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, HttpModule, routing
  ],
  providers: [HttpClientModule,CurewellService],
  bootstrap: [AppComponent]
})
export class AppModule { }
