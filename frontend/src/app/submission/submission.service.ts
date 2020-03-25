import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MaterialService } from '../datatable/shared/material.service';
import { AuthService } from '../auth/auth.service';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService implements OnInit{

  subRetrievedListener = new Subject<any>();

  constructor(
    private http: HttpClient,
    public router: Router,
    public materialService: MaterialService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  updateSubmission(submission) {
    console.log('reached updateSubmission at service');
    this.http
      .post(
        BACKEND_URL + '/updateSubmission',
        {submission: submission}
      )
      .subscribe( result => {
        console.log('submission added');
        this.getSubmissions(null);
      });
  }

  addSubmission(submission) {
    this.http
      .post(
        BACKEND_URL + '/addSubmission',
        {submission: submission}
      )
      .subscribe( result => {
        console.log('submission added');
        this.getSubmissions(null);
      });
  }


  getSubRetrievedListerner() {
    return this.subRetrievedListener.asObservable();
  }
  /*
    View Submission History process
      1. select view submission History
      2. list of material shown
      3. select material
      4. list of submission shown (can filter by actual date or status)

  */

  //ask backend to generate dummy submissions
  genDummySub() {
    console.log('gen dummy rans');
    this.http.post( BACKEND_URL + '/test', { message: 'gay' } ).subscribe();
  }


  //get Submission by material type for a user
  getSubmissions(material: any, recycler = null) {
    let criteria = {} as any;
    let userId = this.authService.getUserId();
    let userType = this.authService.getUserType();
    //console.log( 'userId: ' + userId + "\nuserType: " + userType );

    if ( material ) {
      criteria.material = material;
    } else {
      criteria.status = 'Proposed';
    }

    if ( recycler ) {
      criteria.recyclerId = recycler;
    }

    switch (userType) {
      case 'recycler' :
        criteria.recyclerId = userId;
        break;
      case 'collector' :
        criteria.collectorId = userId;
        break;
    }

    this
      .http
      .post(
        BACKEND_URL + '/getSubmissions',
        criteria
      )
      .subscribe( result => {
        console.log('submission retrieved');
        this.subRetrievedListener.next(result);
      });
  }

  //get Submission by material type for admin
  getAllSubmissions(materials: any) {
  }

}


// remember to make material id auto generate in add material of admin

/*
  recycler add appointment process
    1. select add appointment
    2. list of material displayed
    3. select material
    4. list of collector that collect the material displayed
    5. select collector
    6. select proposed data
    7. submit appointment

  collector record submission process
    0. select confirm submission
    1. enter recycler username
    2. submission related to the recycler are show
    3. select submission
    4. enter weightInKg (can update material)
    5. submit Submission

  collector add submission process
    1. select add submission
    2. record material , recycler's username, weightInKg
    3. submit Submission
*/
