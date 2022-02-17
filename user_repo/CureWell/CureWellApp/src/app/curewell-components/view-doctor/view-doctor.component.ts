import { Component, OnInit } from '@angular/core';
import { IDoctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';

@Component({
  templateUrl: './view-doctor.component.html',
})
export class ViewDoctorComponent implements OnInit {

  doctorList:IDoctor[];
  showMsgDiv: boolean;
  doctorId: number;
  errorMsg: string;

  //Do not modify
  constructor(private _curewellService: CurewellService, private router: Router) { }

  //Do not modify signature
  ngOnInit() {
  //To do implement necessary logic

  }

  //Do not modify signature
  getDoctor() {
  //To do implement necessary logic

  }

}
