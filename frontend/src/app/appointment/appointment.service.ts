import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MaterialService } from '../datatable/shared/material.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService implements OnInit{

  subRetrievedListener = new Subject<any>();

  constructor(
    private http: HttpClient,
    public router: Router,
    public materialService: MaterialService,
    public authService: AuthService
  ) {}


  ngOnInit(): void {

  }


  // getCollectorMaterial(material: any){
  //   let userId = this.authService.getUserId();
  //   let userType = this.authService.getUserType();
  // }


  getCollectorMaterial(id: string){
      return this.http
      .post(
        'http://localhost:3000/api/material/getCollectors',
        {materialId: id}
      )
      .subscribe( result => {
        console.log('materialId :'+ id + 'requsted!' + 'List of CollectorMaterial returned' );
      });
   }




}
