import { Component, OnInit } from '@angular/core';
import { CreateMaterialService } from '../shared/create-material.service';

//import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector:'create-material-form',
  templateUrl: './create-material-form.component.html',
  styleUrls: ['./create-material-form.component.css']
})
export class CreateMaterialFormComponent implements OnInit{
  constructor(public service:CreateMaterialService){}

  ngOnInit(){

  }

  //onClear(){
    //this.service.form.reset();
    //this.service.form.intializeFormGroup();
  //}




}
