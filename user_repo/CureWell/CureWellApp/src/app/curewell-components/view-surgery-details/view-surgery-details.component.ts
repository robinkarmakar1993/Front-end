import { Component, OnInit } from '@angular/core';
import { ISurgery } from '../../curewell-interfaces/surgery';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';

@Component({
  templateUrl: './view-surgery-details.component.html',
})
export class ViewSurgeryDetailsComponent implements OnInit {

  surgeryList: ISurgery[];
  showMsgDiv: boolean;
  errorMsg: string;

  //Do not modify
  constructor(private _curewellService: CurewellService, private router: Router) { }

  //Do not modify signature
  ngOnInit() {
    //To do implement necessary logic
  }

  //Do not modify signature
  getSurgeryDetails() {
    //To do implement necessary logic

  }

  //Do not modify signature
  editSurgery(surgery: ISurgery) {
    //To do implement necessary logic

  }

}
