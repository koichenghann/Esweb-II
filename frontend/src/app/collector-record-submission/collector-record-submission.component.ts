import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SubmissionService } from '../submission/submission.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { MaterialsService } from '../admin-manage-material/material.service';

@Component({
  selector: 'app-collector-record-submission',
  templateUrl: './collector-record-submission.component.html',
  styleUrls: ['./collector-record-submission.component.css']
})
export class CollectorRecordSubmissionComponent implements OnInit {

  userType = this.authService.getUserType();
  collectors:any = [];
  totalPoints = 0;
  ecoLevel = null;
  mobile = false;

  currentRoute = window.location.pathname;
  appointments = [];
  dataSource = [];

  isRecordingSubmission = false;
  isAddingSubmission = false;
  selectedAppointment:any = {};



  form_submission: FormGroup;
  initialError = 'required';
  hide = true;

  submission_materialError = this.initialError;
  submission_recyclerError = this.initialError;
  submission_weightError   = this.initialError;

  recyclerExist = false;
  materialExist = false;

  selectedMaterial;
  recycler;
  material;

  materials;

  constructor( public authService: AuthService, public subService: SubmissionService, public matService: MaterialsService ) { }

  ngOnInit(): void {
    this.setMode();
    this.subscribeToSubmissionRetrieve();
    this.getAppointment();
    this.getMaterials();

    this.subscribeToMaterialExist();
    this.subscribeToRecyclerExist();
    this.setFormGroup();

    //experimenting features for other part
    this.matService.getCollectors('5e6717329d4a704b408a51e9').subscribe( result => {
      //console.log(result);
      this.collectors = result;
      for ( let collector of this.collectors ) {
        console.log(collector);
      }
    });
    this.authService.getPointsUpdatedListener().subscribe( result => {
      this.totalPoints = result.totalPoints;
      this.ecoLevel = result.ecoLevel;
    })
    this.authService.getPoints();

  }


  onResize(event) {

    if (window.screen.width < 850) { // 768px portrait
      this.mobile=true;
    } else {
      this.mobile=false;
    }
    //console.log('size: ' + window.screen.width + " mobile: " + this.mobile);
  }
  setMode(){
    if ( this.currentRoute == '/add-submission') {
      this.authService.setCurrentUrl(this.currentRoute);
      this.isAddingSubmission = true;
    }
    else {
        this.authService.setCurrentUrl(this.currentRoute);
    }
  }

  getMaterials() {
    this.matService.getAllMaterials().subscribe( result => {
      this.materials = result.materials;
    });
  }
  subscribeToSubmissionRetrieve(){
    this.subService.getSubRetrievedListerner().subscribe( result => {
      //this.checkDataIntegrity(result);
      //console.log(result);
      this.convertToTableData(result);
      //console.log(this.appointments);
    });
  }
  subscribeToRecyclerExist(){
    this.authService.getRecyclerExistListener().subscribe( result => {
      if ( result ) {
        //console.log("have result");
        this.recyclerExist = true;
        this.recycler = result;
        //console.log(this.recycler);
        this.form_submission.controls['recycler'].updateValueAndValidity();
      }
    });
  }
  subscribeToMaterialExist(){
    this.matService.getMaterialExistListener().subscribe( result => {
      if ( result ) {
        this.materialExist = true;
        this.material = result;
        //console.log(this.material);
        this.form_submission.controls['material'].updateValueAndValidity();
      }
    });
  }

  submit() {
    if ( this.form_submission.invalid ) {
      return
    }

    let today = new Date();
    let date = today.getFullYear()+'/'+  ('0'+(today.getMonth()+1)).slice(-2)  +'/'+('0'+today.getDate()).slice(-2);
    let submission;

    if ( !this.isAddingSubmission ) {
      submission = {
        _id: this.selectedAppointment._id,
        submissionID: this.selectedAppointment.submissionID,
        proposedDate: this.selectedAppointment.proposedDate,
        actualDate: date,
        weightInKg: this.form_submission.get('weight').value,
        material: this.selectedAppointment.material,
        pointsAwarded: null,
        status: 'Submitted',
        recycler: this.selectedAppointment.recycler,
        collector: this.selectedAppointment.collector
      };

      this.subService.updateSubmission(submission);
      //console.log(submission);
      this.isRecordingSubmission = false;
    }


    else {
      submission = {
        //_id: this.selectedAppointment._id,
        submissionID: null,
        proposedDate: null,
        actualDate: date,
        weightInKg: this.form_submission.get('weight').value,
        material: this.material._id,
        pointsAwarded: null,
        status: 'Submitted',
        recycler: this.recycler._id,
        collector: this.authService.getUserId()
      }
      this.subService.addSubmission(submission);
      this.setFormGroup();
      //console.log(submission);
    }




  }



  convertToTableData( dataSource ){
    this.appointments = [];
    this.appointments = dataSource;
    this.dataSource = this.appointments;
    /*console.log('table updated');
    console.log(dataSource);
    console.log(this.dataSource);*/
  }

  getAppointment(){
    if ( this.userType == 'collector' ) {
      this.subService.getSubmissions(null);
    } else {
      this.subService.getSubmissions(null, this.authService.getUserId());
    }
  }

  findUser(username) {
    //console.log('changed: ' + username);

    if ( username ) {
      if ( this.userType == 'collector' ) {
        this.dataSource = this.appointments.filter( appt => { return appt.recyclerUsername == username});
      } else {
        this.dataSource = this.appointments.filter( appt => { return appt.collectorUsername == username});
      }

    } else {
      this.dataSource = this.appointments;
    }


  }

  reset() {
    this.subService.genDummySub();
  }


  selectAppointment(selectedAppointment) {
    //console.log('selectedAppointment:');
    //console.log(selectedAppointment);
    if ( this.userType == 'collector' ) {
      this.selectedAppointment = selectedAppointment;
      this.isRecordingSubmission=true;
      //this.setFormGroup();
      this.form_submission.get('material').disable();
      this.form_submission.get('recycler').disable()
      this.form_submission.get('material').setValue(this.selectedAppointment.materialName);
      this.form_submission.get('recycler').setValue(this.selectedAppointment.recyclerUsername);
    }
  }

  selectionChanged(selectedMaterial) {
    //console.log(selectedMaterial);
    this.form_submission.get('material').setValue(selectedMaterial);
    this.form_submission.controls['material'].updateValueAndValidity();
    this.validateSubmissionInput('submission_material');
  }













  setFormGroup() {
      this.form_submission = new FormGroup({
        'material': new FormControl("", {
          validators: [
            Validators.required,
            this.validateMaterialExist.bind(this)
          ]
        }),

        'recycler': new FormControl("", {
          validators: [
            Validators.required,
            this.validateRecyclerExist.bind(this)
          ]
        }),

        'weight': new FormControl("", {
          validators: [
            Validators.required,
            Validators.min(0.01)
          ]
        })

      });
  }

  validateMaterialExist(control: FormControl): ValidationErrors {
    if(this.materialExist){
      return null;
    }
    return {notMaterial: 'true'};
  }

  validateRecyclerExist(control: FormControl): ValidationErrors {
    if(this.recyclerExist){
      return null;
    }
    return {notRecycler: 'true'};
  }

  validateSubmissionInput(input: string){



    switch (input) {
      case 'submission_material' :
        this.materialExist = false;
        this.material = {};
        this.form_submission.controls['material'].updateValueAndValidity();
        this.matService.checkMaterialExist(this.form_submission.get('material').value);
        if (this.form_submission.get('material').hasError('notMaterial')) {
          this.submission_materialError  = "material not found";
        }
        if(this.form_submission.get('material').hasError('required')) {
          this.submission_materialError  = "required";
        }
        break;

      case 'submission_recycler' :
        this.recyclerExist = false;
        this.recycler = {};
        this.form_submission.controls['recycler'].updateValueAndValidity();
        this.authService.checkRecyclerExist(this.form_submission.get('recycler').value);
        if (this.form_submission.get('recycler').hasError('notRecycler')) {
          this.submission_recyclerError = "recycler not found";
        }
        if(this.form_submission.get('recycler').hasError('required')) {
          this.submission_recyclerError = "required";
        }
        break;

      case 'submission_weight' :
        if(this.form_submission.get('weight').hasError('required')) {
          this.submission_weightError  = "required";
        }
        if(this.form_submission.get('weight').hasError('min')) {
          this.submission_weightError  = "minimum 0.01";
        }
        break;
    }
  }



}
