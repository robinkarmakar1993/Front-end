import { Injectable } from '@angular/core';
import { IDoctor } from '../curewell-interfaces/doctor';
import { ISurgery } from '../curewell-interfaces/surgery';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CurewellService {

  doctorList: IDoctor[];
  surgeryList: ISurgery[];

  //Do not modify
  constructor(private http: HttpClient) { }
  

  //Do not modify signature
  getDoctors(): Observable<IDoctor[]> {
    //To do implement necessary logic
    return this.http.get<IDoctor[]>('http://localhost:4200/viewDoctors').pipe(catchError(this.errorHandler));
   
  }


  //Do not modify signature
  getAllSurgeriesDetails(): Observable<ISurgery[]> {
    //To do implement necessary logic
    return null;
  }


  //Do not modify signature
  editSurgery(surgeryObj: ISurgery): Observable<boolean> {
    //To do implement necessary logic
    return null;
  }


  //Do not modify signature
  errorHandler(error: HttpErrorResponse) {
    //To do implement necessary logic
    return null;
  }

}
