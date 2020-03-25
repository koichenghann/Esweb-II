import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SubmissionService } from '../submission/submission.service';
import { MaterialsService } from '../admin-manage-material/material.service';
import { AppointmentService } from '../appointment/appointment.service';
import { ConstantPool } from '@angular/compiler';
import { NgForm } from '@angular/forms';

@Component({
  selector:'user-make-appointment',
  templateUrl: './user-make-appointment.component.html',
  styleUrls: ['./user-make-appointment.component.css']

})

export class MakeAppointmentComponent implements OnInit{

  viewCollectorMaterial = false;
  viewSubmitAppointment = false;
  viewDone = false;
  showLoadingBar = true;
  mobile = false;
  materials;
  material;
  today = new Date();
  errorDateMsg = true;



  collector;
  //list of collector
  collectors;

  constructor(
    public authService: AuthService,
    public subService: SubmissionService,
    public matService: MaterialsService,
    public appmtService : AppointmentService
  ) { }

  ngOnInit(): void {
    this.authService.setCurrentUrl(window.location.pathname);

    this.subscribeToMaterialsUpdate();
    this.getMaterials();
    this.onResize(null);
    this.errorDateMsg = true;



  }
  onResize(event) {

    if (window.screen.width < 850) { // 768px portrait
      this.mobile=true;
    } else {
      this.mobile=false;
    }
    //console.log('size: ' + window.screen.width + " mobile: " + this.mobile);
  }

  subscribeToMaterialsUpdate() {
    this.matService.getMaterialsUpdatedListener().subscribe( result => {
      this.getMaterials();
    });
  }

  //get material from material service
  getMaterials() {
    console.log('ran');
    this.matService.getAllMaterials().subscribe( result => {
      this.materials = [];
      for ( let mat of result.materials ) {
        mat = Object.assign({}, mat);
        mat.selected = false;
        this.materials.push(mat);
      }
      console.log(this.materials);

      if (this.materials!=null){
        this.showLoadingBar = false;
      }
    });

  }

  selectMaterial(i) {
    this.material = this.materials[i];
    console.log('material ID: ' + this.material._id);
    this.collectors = [];
    this.getCollectorMaterial();
    this.viewCollectorMaterial = true;
  }

  getCollectorMaterial(){
    this.matService.getCollectors(this.material._id).subscribe( result => {
      console.log(result);
      this.collectors = result;
      for ( let collector of this.collectors){
        console.log(collector);
      }
    });
  }

  selectCollector(i){
    console.log(this.collectors[i]);
    this.collector = this.collectors[i];
    console.log('Collector ID: ' + this.collector.collectorID);
    console.log('Collector Name: ' + this.collector.collectorUsername);
    this.viewSubmitAppointment = true;

  }




  onSubmitAppointment(form: NgForm){
    if (form.invalid) {
      return;
    }
    else if(form.value.proposedDate < this.today){
      this.errorDateMsg = false;
      return;
    }
    else{

    //date validation

    //let date = today.getFullYear()+'/'+  ('0'+(today.getMonth()+1)).slice(-2)  +'/'+('0'+today.getDate()).slice(-2);
    //date format use string yyyy/mm/dd
    let date = form.value.proposedDate;
    let inProposedDate = date.getFullYear()+'/'+('0'+(date.getMonth()+1)).slice(-2)  +'/'+('0'+date.getDate()).slice(-2);
    let submission;

      submission = {
        //_id: this.selectedAppointment._id,
        submissionID: null,
        proposedDate: inProposedDate,
        actualDate: null,
        weightInKg: null,
        material: this.material._id,
        pointsAwarded: null,
        status: 'Proposed',
        recycler: this.authService.getUserId(),
        collector: this.collector.collectorID
      };
      console.log(submission);
      //console.log(this.today);
      this.subService.addSubmission(submission);
      this.viewDone = true;
    }
  }

  newAppointment(){
    this.viewCollectorMaterial = false;
    this.viewSubmitAppointment = false;
    this.viewDone = false;
  }

}
