import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, FormGroup, NgModelGroup } from '@angular/forms';
import { ViewDoctorComponent, ViewSurgeryDetailsComponent, UpdateSurgeryComponent } from './curewell-components/index';
import { CurewellService } from './curewell-services/index';
import { IDoctor, ISurgery } from './curewell-interfaces/index';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { throwError, Observable, } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { routing } from './app.routing';
import { catchError } from 'rxjs/operators';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params, ActivatedRouteSnapshot } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TestingCompilerFactory } from '@angular/core/testing/src/test_compiler';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

describe('All Test Cases', () => {


  let viewDoctorComponent: ViewDoctorComponent;
  let viewDoctorComponentfixture: ComponentFixture<ViewDoctorComponent>;
  let viewSurgeryDetailsComponent: ViewSurgeryDetailsComponent;
  let viewSurgeryDetailsComponentfixture: ComponentFixture<ViewSurgeryDetailsComponent>;
  let updateSurgeryComponent: UpdateSurgeryComponent;
  let updateSurgeryComponentfixture: ComponentFixture<UpdateSurgeryComponent>;
  let curewellService: CurewellService;
  let httpClient: HttpClient;
  let activatedRoute: ActivatedRoute;
  let spy: any;


  afterEach(() => {

    viewDoctorComponent = null;
    viewSurgeryDetailsComponent = null;
    updateSurgeryComponent = null;
    curewellService = null;

    httpClient = null;

  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule.withRoutes([]), routing],
      declarations: [
        ViewDoctorComponent, ViewSurgeryDetailsComponent, UpdateSurgeryComponent
      ], providers: [{ provide: APP_BASE_HREF, useValue: '/' }, CurewellService, HttpClient, HttpHandler]
    }).compileComponents().then(() => {
      httpClient = new HttpClient(null);
      activatedRoute = new ActivatedRoute();
      curewellService = new CurewellService(httpClient);

      updateSurgeryComponent = new UpdateSurgeryComponent(activatedRoute, curewellService, TestBed.get(Router));
      viewDoctorComponent = new ViewDoctorComponent(curewellService, null);
      viewSurgeryDetailsComponent = new ViewSurgeryDetailsComponent(curewellService, null);



    });
  }));


  //---------------------------------Service Test-----------------------------------------------------------

  //getDoctors-list
  it('Service Name:CureWellService, Method Name:getDoctors Test Case1<=>1.25', async(() => {
    var Doctor1: IDoctor = { doctorId: "D001", doctorName: "George", doctorSpecialization:"Anesthesiologist"};
    var Doctor2: IDoctor = { doctorId: "D002", doctorName: "Simon", doctorSpecialization:"Cardiologist" };
    var Doctor3: IDoctor = { doctorId: "D003", doctorName: "Peter", doctorSpecialization: "Dentist" };
    var lstDoctors: IDoctor[] = [Doctor1, Doctor2, Doctor3];

    var obj = Observable.create(observe => { observe.next(lstDoctors); observe.complete(); })
    spyOn(httpClient, 'get').and.returnValue(obj);

    curewellService.getDoctors().subscribe(
      result => {
        expect(result).toEqual(lstDoctors);
      },
      err => { fail(); },
      () => { }
    );
  }));

  //getDoctors-errorhandling
  it('Service Name:CureWellService, Method Name:getDoctors Test Case2<=>0.25', async(() => {

    let tempError = new Error("Error:404 source not found.");
    spyOn(httpClient, 'get').and.callFake(() => {
      return throwError(tempError);
    });

    curewellService.getDoctors().subscribe(
      result => {
        fail();
      },
      error => {
        expect(error).toMatch(tempError.message);
      }
    );
  }));

  //getAllSurgeryDetails-list
  it('Service Name:CureWellService, Method Name:getAllSurgeryDetails Test Case1<=>1.25', async(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId:  "D001",surgeryDate: new Date(2020, 9, 1),  startTime:"09:00:00",  endTime:"14:00:00",  surgeryCategory: "ANE" };
    var Surgery2: ISurgery = { surgeryId: 2, doctorId:  "D002",surgeryDate: new Date(2020, 10, 1), startTime:"10:00:00",  endTime:"16:00:00",  surgeryCategory: "CAR" };
    var Surgery3: ISurgery = { surgeryId: 3, doctorId:  "D003", surgeryDate: new Date(2020, 10, 5), startTime: "09:30:00", endTime: "11:00:00", surgeryCategory: "DEN" };
    var lstSurgery: ISurgery[] = [Surgery1, Surgery2,Surgery3];

    var obj = Observable.create(observe => { observe.next(lstSurgery); observe.complete(); })
    spyOn(httpClient, 'get').and.returnValue(obj);

    curewellService.getAllSurgeriesDetails().subscribe(
      result => {
        expect(result).toEqual(lstSurgery);
      },
      err => { fail(); },
      () => { }
    );
  }));

 //getAllSurgeryDetails-errorhandling
  it('Service Name:CureWellService, Method Name:getAllSurgeryDetails Test Case2<=>0.25', async(() => {

    let tempError = new Error("Error:404 source not found.");
    spyOn(httpClient, 'get').and.callFake(() => {
      return throwError(tempError);
    });

    curewellService.getAllSurgeriesDetails().subscribe(
      result => {
        fail();
      },
      error => {
        expect(error).toMatch(tempError.message);
      }
    );
  }));

  //editSurgery-returnvaluecheck
  it('Service Name:CureWellService, Method Name:editSurgery Test Case1<=>1.25', async(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };
    var obj = Observable.create(observe => { observe.next(true); observe.complete(); })
    spyOn(httpClient, 'put').and.returnValue(obj);
    curewellService.editSurgery(Surgery1).subscribe(
      result => {
        expect(result).toMatch(true.toString());
      },
      error => { fail(); }
    );

  }));

  //editSurgery-errorhandling
  it('Service Name:CureWellService, Method Name:editSurgery Test Case2<=>0.25', async(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };
    let tempError = new Error("Error:404 source not found.");
    spyOn(httpClient, 'put').and.callFake(() => {
      return throwError(tempError);
    });

    curewellService.editSurgery(Surgery1).subscribe(
      result => {
        fail();
      },
      error => {
        expect(error).toMatch(tempError.message);
      }
    );
  }));

  //errorhandler-error.message
  it('Service Name:CureWellService, Method Name:errorHandler Test Case2<=>0.25', async(() => {
    let errorObj = new Error("Error:404 source not found.");
    let error = { message: "Error:404 source not found." }
    curewellService.errorHandler(<any>error).subscribe(
      result => { fail(); },
      error => { expect(error).toMatch("Error:404 source not found."); }
    );

  }));

  //-------------------------------Component Test--------------------------------------------------------------
  //-------------------------------Update Surgery-----------------------------------------------------------------

  //ngOnInit-params_string
  it('Component name:UpdateSurgeryComponent Method name:ngOnInit TestCase1<=>1', async(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };
    let paramList: Params = {
      ["surgeryId"]: 1,
      ["doctorId"]: "D001",
      ["surgeryDate"]: new Date("10/1/20"),
      ["startTime"]: "09:00:00",
      ["endTime"]: "14:00:00",
      ["surgeryCategory"]: "ANE",
    };
    activatedRoute.snapshot = new ActivatedRouteSnapshot();
    activatedRoute.snapshot.params = paramList
    updateSurgeryComponent.ngOnInit();
    expect(updateSurgeryComponent.surgeryId).toBe(Surgery1.surgeryId);
    expect(updateSurgeryComponent.doctorId).toMatch(Surgery1.doctorId);
    expect(updateSurgeryComponent.surgeryDate).toEqual(Surgery1.surgeryDate);
    expect(updateSurgeryComponent.startTime).toMatch(Surgery1.startTime);
    expect(updateSurgeryComponent.endTime).toMatch(Surgery1.endTime);
    expect(updateSurgeryComponent.surgeryCategory).toMatch(Surgery1.surgeryCategory);

  }));

  //editSurgery-status_form
  it('Component name:updateSurgeryComponent Method name:editSurgery TestCase1<=>2', fakeAsync(() => {
    var testForm = <NgForm>{ value: { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE"  } };
    var obj = Observable.create(observe => { observe.next(true); observe.complete(); })
    spyOn(curewellService, "editSurgery").and.returnValue(obj);
    let router: Router = TestBed.get(Router);
    let location: Location = TestBed.get(Location);
    router.initialNavigation();
    updateSurgeryComponent.editSurgery(testForm);
    tick(50);
    expect(updateSurgeryComponent.status).toMatch(true.toString());
  }));

  //editSurgery-navigate_true
  it('Component name:updateSurgeryComponent Method name:editSurgery TestCase2<=>2', fakeAsync(() => {
    var testForm = <NgForm>{ value: { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" } };
    var obj = Observable.create(observe => { observe.next(true); observe.complete(); })
    spyOn(curewellService, "editSurgery").and.returnValue(obj);
    let router: Router = TestBed.get(Router);
    let location: Location = TestBed.get(Location);
    router.initialNavigation();
    updateSurgeryComponent.editSurgery(testForm);
    tick(50);
    expect(location.path()).toBe('/viewSurgeryDetails');
  }));

  //editSurgery-navigate_false
  it('Component name:updateSurgeryComponent Method name:editSurgery TestCase3<=>2', fakeAsync(() => {
    var testForm = <NgForm>{ value: { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" } };
    var obj = Observable.create(observe => { observe.next(false); observe.complete(); })
    spyOn(curewellService, "editSurgery").and.returnValue(obj);
    let router: Router = TestBed.get(Router);
    let location: Location = TestBed.get(Location);
    router.initialNavigation();
    updateSurgeryComponent.editSurgery(testForm);
    tick(50);
    expect(location.path()).toBe('/viewSurgeryDetails');
  }));

  //editSurgery-errorMsg
  it('Component name:updateSurgeryComponent Method name:editSurgery TestCase4<=>1', fakeAsync(() => {

    var testForm = <NgForm>{ value: { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" } };
    spy = spyOn(curewellService, 'editSurgery').and.callFake(() => {
      return throwError(new Error("Error:404 source not found."));
    });
    let router: Router = TestBed.get(Router);
    let location: Location = TestBed.get(Location);
    router.initialNavigation();
    updateSurgeryComponent.editSurgery(testForm);
    tick(50);
    expect(updateSurgeryComponent.errorMsg).toMatch("Error:404 source not found.");
  }));

  //editSurgery-navigate_error
  it('Component name:updateSurgeryComponent Method name:editSurgery TestCase5<=>1', fakeAsync(() => {
    var testForm = <NgForm>{ value: { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" } };
    spy = spyOn(curewellService, 'editSurgery').and.callFake(() => {
      return throwError(new Error("Error:404 source not found."));
    });
    let router: Router = TestBed.get(Router);
    let location: Location = TestBed.get(Location);
    router.initialNavigation();
    updateSurgeryComponent.editSurgery(testForm);
    tick(50);
    expect(location.path()).toBe('/viewSurgeryDetails');
  }));

  //--------------------------------View Doctors--------------------------------------------------------------

  //ngOnInit
  it('Component Name:ViewDoctorComponent, Method Name:ngOnInit Test Case1<=>1', async(() => {
    spy = spyOn(viewDoctorComponent, 'getDoctor');
    viewDoctorComponent.ngOnInit();
    expect(viewDoctorComponent.getDoctor).toHaveBeenCalled();
  }));

  //getDoctor-list
  it('Component Name:ViewDoctorComponent, Method Name:getDoctor Test Case1<=>1', async(() => {
    var Doctor1: IDoctor = { doctorId: "D001", doctorName: "George", doctorSpecialization: "Anesthesiologist" };
    var Doctor2: IDoctor = { doctorId: "D002", doctorName: "Simon", doctorSpecialization: "Cardiologist" };
    var Doctor3: IDoctor = { doctorId: "D003", doctorName: "Peter", doctorSpecialization: "Dentist" };
    var lstDoctors: IDoctor[] = [Doctor1, Doctor2, Doctor3];

    var obj = Observable.create(observe => { observe.next(lstDoctors); observe.complete(); })
    spy = spyOn(curewellService, 'getDoctors').and.returnValue(obj);
    viewDoctorComponent.getDoctor();
    expect(viewDoctorComponent.doctorList).toEqual(lstDoctors);

  }));

  //getDoctor-showMsgDiv_success
  it('Component Name:ViewDoctorComponent, Method Name:getDoctor Test Case2<=>1', async(() => {
    var Doctor1: IDoctor = { doctorId: "D001", doctorName: "George", doctorSpecialization: "Anesthesiologist" };
    var Doctor2: IDoctor = { doctorId: "D002", doctorName: "Simon", doctorSpecialization: "Cardiologist" };
    var Doctor3: IDoctor = { doctorId: "D003", doctorName: "Peter", doctorSpecialization: "Dentist" };
    var lstDoctors: IDoctor[] = [Doctor1, Doctor2, Doctor3];

  var obj = Observable.create(observe => { observe.next(lstDoctors); observe.complete(); })
    spy = spyOn(curewellService, 'getDoctors').and.returnValue(obj);
    viewDoctorComponent.getDoctor();
    expect(viewDoctorComponent.showMsgDiv).toMatch(false.toString());
  }));

  //getDoctor-errorMsg
  it('Component name:ViewDoctorComponent Method name:getDoctor TestCase3<=>1', async(() => {

    spy = spyOn(curewellService, 'getDoctors').and.callFake(() => {
      return throwError(new Error("Error:404 source not found."));
    });
    viewDoctorComponent.getDoctor();
    expect(viewDoctorComponent.errorMsg).toMatch("Error:404 source not found.");
 
  }));

  //getDoctor-showMsgDiv_error
  it('Component name:ViewDoctorComponent Method name:getDoctor TestCase4<=>1', async(() => {

    spy = spyOn(curewellService, 'getDoctors').and.callFake(() => {
      return throwError(new Error("Error:404 source not found."));
    });
    viewDoctorComponent.getDoctor();
    expect(viewDoctorComponent.showMsgDiv).toMatch(true.toString());
  }));

  //getDoctor-null
  it('Component name:ViewDoctorComponent Method name:getDoctor TestCase5<=>1', async(() => {

    spy = spyOn(curewellService, 'getDoctors').and.callFake(() => {
      return throwError(new Error("Error:404 source not found."));
    });
    viewDoctorComponent.getDoctor();
    expect(viewDoctorComponent.doctorList).toBeNull();
  }));

  //-----------------------------------------View Surgery--------------------------------------------------------------
  //ngOnInit
  it('Component name:viewSurgeryDetailsComponent Method name:ngOnInit TestCase1<=>1', async(() => {

    var obj = Observable.create(observe => { observe.next(true); observe.complete(); })
    spyOn(viewSurgeryDetailsComponent, "getSurgeryDetails").and.returnValue(obj);
    viewSurgeryDetailsComponent.ngOnInit();
    expect(viewSurgeryDetailsComponent.getSurgeryDetails).toHaveBeenCalled();

  }));

  //getAllSurgeriesDetails-list
  it('Service Name:viewSurgeryDetailsComponent, Method Name:getAllSurgeriesDetails Test Case1<=>2.5', async(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };
    var Surgery2: ISurgery = { surgeryId: 2, doctorId: "D002", surgeryDate: new Date(2020, 10, 1), startTime: "10:00:00", endTime: "16:00:00", surgeryCategory: "CAR" };
    var Surgery3: ISurgery = { surgeryId: 3, doctorId: "D003", surgeryDate: new Date(2020, 10, 5), startTime: "09:30:00", endTime: "11:00:00", surgeryCategory: "DEN" };
    var lstSurgery: ISurgery[] = [Surgery1, Surgery2, Surgery3];

    var obj = Observable.create(observe => { observe.next(lstSurgery); observe.complete(); });
    spy = spyOn(curewellService, 'getAllSurgeriesDetails').and.returnValue(obj); viewSurgeryDetailsComponent.getSurgeryDetails();
    expect(viewSurgeryDetailsComponent.surgeryList).toEqual(lstSurgery);
  }));

  //getAllSurgeriesDetails-showMsgDiv_success
  it('Component Name:viewSurgeryDetailsComponent, Method Name:getAllSurgeriesDetails Test Case2<=>1', async(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };
    var Surgery2: ISurgery = { surgeryId: 2, doctorId: "D002", surgeryDate: new Date(2020, 10, 1), startTime: "10:00:00", endTime: "16:00:00", surgeryCategory: "CAR" };
    var Surgery3: ISurgery = { surgeryId: 3, doctorId: "D003", surgeryDate: new Date(2020, 10, 5), startTime: "09:30:00", endTime: "11:00:00", surgeryCategory: "DEN" };
    var lstSurgery: ISurgery[] = [Surgery1, Surgery2, Surgery3];

    var obj = Observable.create(observe => { observe.next(lstSurgery); observe.complete(); })
    spy = spyOn(curewellService, 'getAllSurgeriesDetails').and.returnValue(obj);
    viewSurgeryDetailsComponent.getSurgeryDetails();
    expect(viewSurgeryDetailsComponent.showMsgDiv).toMatch(false.toString());
  }));

 //getAllSurgeriesDetails-errorMsg
  it('Component name:viewSurgeryDetailsComponent Method name:getAllSurgeriesDetails TestCase3<=>1', async(() => {

    spy = spyOn(curewellService, 'getAllSurgeriesDetails').and.callFake(() => {
      return throwError(new Error("Error:404 source not found."));
    });
    viewSurgeryDetailsComponent.getSurgeryDetails();
    expect(viewSurgeryDetailsComponent.errorMsg).toMatch("Error:404 source not found.");
  }));

  //getAllSurgeriesDetails-null
  it('Component name:viewSurgeryDetailsComponent Method name:getAllSurgeriesDetails TestCase4<=>1', async(() => {

    spy = spyOn(curewellService, 'getAllSurgeriesDetails').and.callFake(() => {
      return throwError(new Error("Error:404 source not found."));
    });
    viewSurgeryDetailsComponent.getSurgeryDetails();
    expect(viewSurgeryDetailsComponent.surgeryList).toBeNull();
  }));

  //getAllSurgeriesDetails-showMsgDiv_error
  it('Component name:viewSurgeryDetailsComponent Method name:getAllSurgeriesDetails TestCase5<=>1', async(() => {

    spy = spyOn(curewellService, 'getAllSurgeriesDetails').and.callFake(() => {
      return throwError(new Error("Error:404 source not found."));
    });
    viewSurgeryDetailsComponent.getSurgeryDetails();
    expect(viewSurgeryDetailsComponent.showMsgDiv).toMatch(true.toString());
  }));

  //editSurgery-path
  it('Component name:viewSurgeryDetailsComponent Method name:editSurgery TestCase1<=>1', fakeAsync(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };

    let router: Router = TestBed.get(Router);
    let location: Location = TestBed.get(Location);
    viewSurgeryDetailsComponentfixture = TestBed.createComponent(ViewSurgeryDetailsComponent);
    viewSurgeryDetailsComponent = viewSurgeryDetailsComponentfixture.componentInstance;
    router.initialNavigation();
    viewSurgeryDetailsComponent.editSurgery(Surgery1);
    //router.navigate(['/editSurgery/1001/5001/Tue Sep 01 2020 00:00:00 GMT+0530 (India Standard Time)/09:00:00/14:00:00/ANE'])
    tick(30);
    expect(location.path()).toBe('/editSurgery/' + Surgery1.surgeryId + '/' + Surgery1.doctorId + '/' + Surgery1.startTime + '/' + Surgery1.endTime + '/' + Surgery1.surgeryCategory);
  }));

  //editSurgery-locationpath_button
  it('Component name:viewSurgeryDetailsComponent Method name:addBooking TestCase2<=>1.5', fakeAsync(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };

    var var2: ISurgery[] = [Surgery1];
    viewSurgeryDetailsComponentfixture = TestBed.createComponent(ViewSurgeryDetailsComponent);
    viewSurgeryDetailsComponent = viewSurgeryDetailsComponentfixture.componentInstance;
    viewSurgeryDetailsComponent.surgeryList = var2;
    spyOn(viewSurgeryDetailsComponent, "ngOnInit");
    viewSurgeryDetailsComponentfixture.detectChanges();
    let router: Router = TestBed.get(Router);
    let location: Location = TestBed.get(Location);
    let button = viewSurgeryDetailsComponentfixture.debugElement.nativeElement.querySelector('button');
    button.click();
    viewSurgeryDetailsComponentfixture.whenStable().then(() => {
      tick(30);
      expect(location.path()).toBe('/editSurgery/' + Surgery1.surgeryId + '/' + Surgery1.doctorId + '/' + Surgery1.startTime + '/' + Surgery1.endTime + '/' + Surgery1.surgeryCategory);
    })
  }));

  //------------------------------------------View Test--------------------------------------------------------
  //------------------------------------------Update Surgery------------------------------------------------------

  //ngSubmit
  it('Component name:UpdateSurgeryComponent Method name:ngSubmit TestCase1<=>0.75', async(() => {
    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponent = updateSurgeryComponentfixture.componentInstance;
    spyOn(updateSurgeryComponent, 'ngOnInit');
    spyOn(updateSurgeryComponent, 'editSurgery');
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.whenStable().then(() => {
      updateSurgeryComponentfixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
      expect(updateSurgeryComponent.editSurgery).toHaveBeenCalled();
    });
  }));

  //validation
  //doctorId -required
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase2<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    updateSurgeryComponentfixture.whenStable().then(() => {

      expect(updateSurgeryComponentfixture.nativeElement.querySelector('#doctorId').required).toBeTruthy();
    });

  }));

  //doctorId-ngIf-touched
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase3<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_doctorId_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

     updateSurgeryComponentfixture.componentInstance.ngForm.form.get('doctorId').markAsTouched();

      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_doctorId_validate_id')).not.toBeNull();

      });
    });

  }));

  //doctorId-ngIf-dirty
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase3.1<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_doctorId_validate_id')).toBe(null);

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('doctorId').markAsDirty();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_doctorId_validate_id')).not.toBe(null);

      });
    });

  }));

 //surgeryDate-required
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase4<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    updateSurgeryComponentfixture.whenStable().then(() => {

      expect(updateSurgeryComponentfixture.componentInstance.ngForm.form.get('surgeryDate').errors.required).toBeTruthy();
    });

  }));

   //surgeryDate-ngIf-touched
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase5<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryDate_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('surgeryDate').markAsTouched();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryDate_validate_id')).not.toBeNull();

          });
    });
  }));

  //surgeryDate-ngIf-dirty
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase5.1<=>0.25', async(() => {
    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryDate_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('surgeryDate').markAsDirty();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryDate_validate_id')).not.toBeNull();

      });
    });
  }));

  //startTime-required
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase6<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    updateSurgeryComponentfixture.whenStable().then(() => {

      expect(updateSurgeryComponentfixture.componentInstance.ngForm.form.get('startTime').errors.required).toBeTruthy();
     });

  }));

  //startTime-ngIf-touched
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase7<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_startTime_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('startTime').markAsTouched();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_startTime_validate_id')).not.toBeNull();


      });
    });
  }));

  //startTime-ngIf-dirty
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase7.1<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_startTime_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('startTime').markAsDirty();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_startTime_validate_id')).not.toBeNull();

      });
    });
  }));

  //endTime-Required
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase8<=>0.25', async(() => {
    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    updateSurgeryComponentfixture.whenStable().then(() => {

      expect(updateSurgeryComponentfixture.componentInstance.ngForm.form.get('endTime').errors.required).toBeTruthy();
    });


  }));

  //endTime-ngIf-touched
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase9<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_endtime_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('endTime').markAsTouched();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_endtime_validate_id')).not.toBeNull();


      });
    });
  }));

  //endTime-ngIf-dirty
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase9.1<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_endtime_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('endTime').markAsDirty();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_endtime_validate_id')).not.toBeNull();

      });
    });
  }));

  //surgeryCategory-Required
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase10<=>0.25', async(() => {
    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    updateSurgeryComponentfixture.whenStable().then(() => {

      expect(updateSurgeryComponentfixture.componentInstance.ngForm.form.get('surgeryCategory').errors.required).toBeTruthy();
    });


  }));

  //surgeryCategory-ngIf-touched
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase11<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryCategory_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('surgeryCategory').markAsTouched();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryCategory_validate_id')).not.toBeNull();


      });
    });
  }));

  //surgeryCategory-ngIf-dirty
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase11.1<=>0.25', async(() => {

    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryCategory_validate_id')).toBeNull();

    updateSurgeryComponentfixture.whenStable().then(() => {

      updateSurgeryComponentfixture.componentInstance.ngForm.form.get('surgeryCategory').markAsDirty();
      updateSurgeryComponentfixture.detectChanges();
      updateSurgeryComponentfixture.whenStable().then(() => {
        expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryCategory_validate_id')).not.toBeNull();

      });
    });
  }));

  //surgeryId-readonly
  it('Component name:UpdateSurgeryComponent Method name:editSurgery TestCase8<=>0.25', async(() => {
    updateSurgeryComponentfixture = TestBed.createComponent(UpdateSurgeryComponent);
    updateSurgeryComponentfixture.detectChanges();
    updateSurgeryComponentfixture.debugElement.classes;
    updateSurgeryComponentfixture.whenStable().then(() => {
      expect(updateSurgeryComponentfixture.nativeElement.querySelector('#add_surgeryId_validate').readOnly).toBeTruthy();
    });

  }));

  //--------------------------------------------View Doctor----------------------------------------------------

  //getDoctor-ngFor_elements
  it('Component name:viewDoctorComponent Method name:getDoctor TestCase2<=>0.75', async(() => {

    var Surgery1: IDoctor = { doctorId: "D001", doctorName: "George", doctorSpecialization: "Anesthesiologist" };
    var lstFlights: IDoctor[] = [Surgery1];
    viewDoctorComponentfixture = TestBed.createComponent(ViewDoctorComponent);
    viewDoctorComponent = viewDoctorComponentfixture.componentInstance;
    viewDoctorComponent.doctorList = lstFlights;
    spyOn(viewDoctorComponent, "ngOnInit");
    viewDoctorComponentfixture.detectChanges();
    spyOn(viewDoctorComponent, "getDoctor");
    viewDoctorComponentfixture.whenStable().then(() => {
      let x = viewDoctorComponentfixture.debugElement.nativeElement.querySelector('#doctorsList_id');
      expect(x.cells[0].innerHTML).toMatch("D001");
      expect(x.cells[1].innerHTML).toMatch("George");
      expect(x.cells[2].innerHTML).toMatch("Anesthesiologist");

    
    })
  }));

  //------------------------------------------View Surgery Details------------------------------------------------------

  //getSurgeryDetails-ngFor-elements
  it('Component name:ViewSurgeryDetailsComponent Method name:getSurgeryDetails TestCase3<=>0.75', async(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };
    var lstBooking: ISurgery[] = [Surgery1];
    viewSurgeryDetailsComponentfixture = TestBed.createComponent(ViewSurgeryDetailsComponent);
    viewSurgeryDetailsComponent = viewSurgeryDetailsComponentfixture.componentInstance;
    viewSurgeryDetailsComponent.surgeryList = lstBooking;
    spyOn(viewSurgeryDetailsComponent, "ngOnInit");
    viewSurgeryDetailsComponentfixture.detectChanges();
    spyOn(viewSurgeryDetailsComponent, "getSurgeryDetails");
    viewSurgeryDetailsComponentfixture.whenStable().then(() => {
      let x = viewSurgeryDetailsComponentfixture.debugElement.nativeElement.querySelector('#surgeryList_id');
      expect(x.cells[0].innerHTML).toMatch("1");
      expect(x.cells[1].innerHTML).toMatch("D001");
      expect(x.cells[3].innerHTML).toMatch("09:00:00");
      expect(x.cells[4].innerHTML).toMatch("14:00:00");
      expect(x.cells[5].innerHTML).toMatch("ANE");
    })
  }));

  //getSurgeryDetails-datePipe
  it('Component name:ViewSurgeryDetailsComponent Method name:getSurgeryDetails TestCase4<=>0.75', async(() => {
    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };
    var lstBooking: ISurgery[] = [Surgery1];
    viewSurgeryDetailsComponentfixture = TestBed.createComponent(ViewSurgeryDetailsComponent);
    viewSurgeryDetailsComponent = viewSurgeryDetailsComponentfixture.componentInstance;
    viewSurgeryDetailsComponent.surgeryList = lstBooking;
    spyOn(viewSurgeryDetailsComponent, "ngOnInit");
    viewSurgeryDetailsComponentfixture.detectChanges();
    spyOn(viewSurgeryDetailsComponent, "getSurgeryDetails");
    viewSurgeryDetailsComponentfixture.whenStable().then(() => {
      let x = viewSurgeryDetailsComponentfixture.debugElement.nativeElement.querySelector('#surgeryList_id');
      expect(x.cells[2].innerHTML).toMatch("10/1/20");
    })
  }));

  //viewSurgery-click()
  it('Component name:ViewSurgeryDetailsComponent Method name:editSurgery TestCase1<=>1.25', async(() => {

    var Surgery1: ISurgery = { surgeryId: 1, doctorId: "D001", surgeryDate: new Date(2020, 9, 1), startTime: "09:00:00", endTime: "14:00:00", surgeryCategory: "ANE" };
    var lstFlights: ISurgery[] = [Surgery1];
    viewSurgeryDetailsComponentfixture = TestBed.createComponent(ViewSurgeryDetailsComponent);
    viewSurgeryDetailsComponent = viewSurgeryDetailsComponentfixture.componentInstance;
    viewSurgeryDetailsComponent.surgeryList = lstFlights;
    spyOn(viewSurgeryDetailsComponent, "ngOnInit");
    viewSurgeryDetailsComponentfixture.detectChanges();
    spyOn(viewSurgeryDetailsComponent, "editSurgery");
    let button = viewSurgeryDetailsComponentfixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(viewSurgeryDetailsComponent.editSurgery).toHaveBeenCalled();

  }));


});
