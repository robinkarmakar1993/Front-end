import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { ISurgery } from '../../curewell-interfaces/surgery';


@Component({
  templateUrl: './update-surgery.component.html'
})
export class UpdateSurgeryComponent implements OnInit {
  @ViewChild(NgForm) ngForm: NgForm;

  surgeryId: number;
  doctorId: string;
  surgeryDate: Date;
  startTime: string;
  endTime: string;
  surgeryCategory: string;
  status: boolean;
  errorMsg: string;
  surgeryObj: ISurgery

  //Do not modify
  constructor(private route: ActivatedRoute, private _cureWellService: CurewellService, private router: Router) { }

  //Do not modify signature
  ngOnInit() {
  //To do implement necessary logic

  }

  //Do not modify signature
  editSurgery(form: NgForm) {
  //To do implement necessary logic

    
  }
}
