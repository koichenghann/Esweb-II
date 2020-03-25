import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CreateMaterialService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    materialID: new FormControl('', Validators.required),
    materialName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    pointsPerKg: new FormControl('', Validators.required),
  });

  intializeFormGroup(){
    this.form.setValue({
      $key:null,
      materialID:'',
      materialName: '',
      description: '',
      pointsPerKg: ''
    });
  }
}


