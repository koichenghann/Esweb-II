import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { MaterialData } from './material-data.model';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Injectable({
  providedIn: 'root'
})
export class MaterialService implements OnInit{
constructor(private http: HttpClient){}

  ngOnInit(){
  }

  createMaterial(){
    const material ={
      materialID: 'A0001',
      materialName:  'Paper',
      description:  'Paper is made from tree',
      pointsPerKg: '0.2'
    };

    this.http.post('http://localhost:3000/api/material/newMaterial', material);
  }

}
