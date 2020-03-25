import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ScheduleData } from '../auth/schedule-data.model';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddCollectorMaterialDialogComponent } from '../add-collector-material-dialog/add-collector-material-dialog.component';
import { MaterialsService } from '../admin-manage-material/material.service';
import { Material } from '../admin-manage-material/material.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //variable related to form
  hide = true;
  userType = 'collector';
  form_recycler: FormGroup;
  form_collector: FormGroup;
  isUnique = true;
  initialError = 'required1';
  recycler_usernameError  = this.initialError;
  recycler_passwordError  = this.initialError;
  recycler_fullNameError  = this.initialError;
  recycler_addressError   = this.initialError;
  recycler_scheduleError  = this.initialError;
  collector_usernameError  = this.initialError;
  collector_passwordError  = this.initialError;
  collector_fullNameError  = this.initialError;
  collector_addressError   = this.initialError;
  collector_scheduleError  = this.initialError;

  usernameInput = '';
  private mode = 'recycler';
  private uniqueUsernameListener: Subscription;



  //variable related to schedule table
  week:ScheduleData[]=[];
  tableLoadLiao = false;
  result:ScheduleData[]=[];
  timeIsValid = true;
  errorMessage = "";
  timeError = "[invalid time]: time end must be after time start";
  validationList : boolean[];
  errorList : string[];

  timePicker;
  timeTable;

  //other
  currentUser;
  isEditingUser = false;
  isEditingSched= false;

  //material realted variable
  materials=[];
  collectorMaterials=[];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService,
    @Inject(DOCUMENT) document,
    public materialsService: MaterialsService
  ) { }

  ngOnInit(): void {
      this.authService.setCurrentUrl(window.location.pathname);

    //initialiseUserData
    this.initialiseUserData();
    if ( this.userType == 'collector' ) {
      this.initialiseScheduleData();
    }

    this.initialiseMaterialTable();

    //retrieve material detail
    //this.materialsService.getMaterialsUpdatedListener().subscribe(){}
  }


  initialiseMaterialTable() {

    this.authService.getCollectorMaterialUpdatedListener().subscribe( result => {
      //console.log(result);
      //console.log('table refreshed');
      //console.log(result);
      if ( result ) {
        this.collectorMaterials = result;
      }  else {
        this.collectorMaterials = [];
      }
    })
    this.authService.getCollectorMaterials();
  }


  openDialog() {
    this.materialsService.getAllMaterials().subscribe( result => {
      //this.materials=[];
      if ( this.materials.length == 0 ) {
        for ( let material of result.materials ) {
          let selected = false;
          for ( let colMat of this.collectorMaterials ) {
            if ( colMat._id == material._id ) {
              selected = true;
            }
          }
          this.materials.push({
            _id: material._id,
            materialID: material.materialID,
            materialName: material.materialName,
            pointsPerKg: material.pointsPerKg,
            selected: selected
          });
        }
      }


      let dialogRef = this.dialog.open(AddCollectorMaterialDialogComponent, { data: this.materials, disableClose:true });
      dialogRef.afterClosed().subscribe( result => {
        this.dialogClosed(result);
      });

    });
  }

  dialogClosed( materials: any ) {
    //console.log(this.materials);

    if ( materials!='false' ) {
      this.materials=[];
      this.materials=materials;
      this.saveCollectorMaterial(materials);
      //this.initialiseMaterialTable();

    }


    //now add material to collectorMaterial list
  }

  saveCollectorMaterial(materials:any) {
    //console.log(materials);
    this.authService.updateMaterial( materials, this.authService.getUserId() );
    //this.authService.getCollectorMaterials();
  }


  editUserData() {
    if ( !this.isEditingUser ) {
      //document.getElementById('btnEdit1').innerHTML = 'Save';
      document.getElementById('btnEdit1').setAttribute('mode', 'save');
      this.isEditingUser = true;
      this.form_collector.enable();
      this.form_recycler.enable();

      /*let timeTable = document.getElementById('timeTable');
      let cells = timeTable.getElementsByTagName('td');
      for (let i=0; i<cells.length; i++){
        if (cells[i].innerHTML == '-') {
          cells[i].innerHTML = 'edit';
        }
      }*/
    } else {
      if ( this.saveUserData() ) {
        //document.getElementById('btnEdit1').innerHTML = "Edit";
        document.getElementById('btnEdit1').setAttribute('mode', 'edit');
        this.isEditingUser = false;
        this.form_collector.disable();
        this.form_recycler.disable();

        /*let timeTable = document.getElementById('timeTable');
        let cells = timeTable.getElementsByTagName('td');
        for (let i=0; i<cells.length; i++){
          if (cells[i].innerHTML == 'edit') {
            cells[i].innerHTML = '-';
          }
        }*/
      }
    }

  }


  editScheduleData() {
    if ( !this.isEditingSched ) {

      //document.getElementById('btnEdit2').innerHTML = 'Save';
      document.getElementById('btnEdit2').setAttribute('mode', 'save');
      this.isEditingSched = true;
      //this.form_collector.enable();
      //this.form_recycler.enable();

      let timeTable = document.getElementById('timeTable');
      let cells = timeTable.getElementsByTagName('td');
      for (let i=0; i<cells.length; i++){
        if (cells[i].innerHTML == '-') {
          cells[i].innerHTML = 'edit';
        }
      }
    } else {
      if ( this.saveScheduleData() ) {
        //document.getElementById('btnEdit2').innerHTML = "Edit";
        document.getElementById('btnEdit2').setAttribute('mode', 'edit');
        this.isEditingSched = false;
        //this.form_collector.disable();
        //this.form_recycler.disable();

        let timeTable = document.getElementById('timeTable');
        let cells = timeTable.getElementsByTagName('td');
        for (let i=0; i<cells.length; i++){
          if (cells[i].innerHTML == 'edit') {
            cells[i].innerHTML = '-';
          }
        }
      }
    }
  }
    //this.authService.createColPart1(username, password, fullName, address, schedule, userType);

    //this.authService.createUser(username, password, fullName, address, schedule, userType);


  saveUserData() {
    //console.log('save User Date ran');
    let formValid;
    let username;
    let password;
    let fullName;
    let address;
    let schedule;
    let userType;

    if ( this.currentUser.userType == 'recycler' ){
      formValid = !this.form_recycler.invalid;
      username  = this.form_recycler.get('username').value;
      password  = this.form_recycler.get('password').value;
      fullName  = this.form_recycler.get('fullName').value;
      address   = null;
      schedule  = null;
      userType  = "recycler";
    }

    else {
      formValid = !this.form_collector.invalid;
      username  = this.form_collector.get('username').value;
      password  = this.form_collector.get('password').value;
      fullName  = this.form_collector.get('fullName').value;
      address   = this.form_collector.get('address').value;
      schedule  = null;
      userType  = "collector";
    }

    if ( userType == 'collector' ) {
      if(formValid){
      /*  let weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for(var i=0;i<7;i++){
          this.result[i].day = weekDay[i];
          if(this.result[i].startTime=="edit" || this.result[i].startTime==""){this.result[i].startTime=null;}
          if(this.result[i].endTime=="edit" || this.result[i].endTime==""){this.result[i].endTime=null;}
        }*/
        let userData = {username: username, password:password, fullName:fullName, address:address, schedule:schedule, userType:userType};
        //let scheduleData = this.result;

        this.authService.updateProfile(userData);
        this.form_collector.get('password').setValue(null);
        return true;
      }
    } else {
      if(formValid){
        let userData = {username: username, password:password, fullName:fullName, address:address, schedule:schedule, userType:userType};
        this.authService.updateProfile(userData);
        this.form_recycler.get('password').setValue(null);
        return true;
      }
    }

    return false;
  }

  saveScheduleData(){
    if(this.timeIsValid){
      let weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for(var i=0;i<7;i++){
        this.result[i].day = weekDay[i];
        if(this.result[i].startTime=="edit" || this.result[i].startTime==""){this.result[i].startTime=null;}
        if(this.result[i].endTime=="edit" || this.result[i].endTime==""){this.result[i].endTime=null;}
      }
      let scheduleData = this.result;
      this.authService.updateSchedule( scheduleData, this.authService.getUserId() );
      return true;
    }
    return false;
  }



  resetUser() {
    this.isEditingUser = false;
    //document.getElementById('btnEdit1').innerHTML = "Edit";
    document.getElementById('btnEdit1').setAttribute('mode', 'edit');
    this.initialiseUserData();

  }
  resetSched() {
    this.isEditingSched = false;
    //document.getElementById('btnEdit2').innerHTML = "Edit";
    document.getElementById('btnEdit2').setAttribute('mode', 'edit');

    this.initialiseScheduleData();
  }






  //initialisation process
  initialiseUserData() {
    this.userType = this.authService.getUserType();
    this.setFormGroup();
    this.form_collector.disable();
    this.form_recycler.disable();
    let userRetrievedListener : Subscription = this.authService.getUserIsRetrieved().subscribe(
      (result) => {
        this.currentUser = result;

        //COLELCTOR
        this.form_collector.get('username').setValue(result.username);
        //this.form_collector.get('password').setValue(result.password);
        this.form_collector.get('fullName').setValue(result.fullName);
        this.form_collector.get('address').setValue(result.address);

        //RECYCLER
        this.form_recycler.get('username').setValue(result.username);
        //this.form_collector.get('password').setValue(result.password);
        this.form_recycler.get('fullName').setValue(result.fullName);

      });
    this.authService.getUser();
  }
  initialiseScheduleData() {
    this.timeIsValid = true;
    this.timePicker = `<form><input matInput class="timePicker" type="time" name="" value=""></form>`;
    this.timeTable = document.getElementById('timeTable');

    let scheduleRetrievedListener : Subscription = this.authService.getScheduleIsRetrieved().subscribe(
      (schedule) => {
        this.result = schedule;
        this.week =[];
        let weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for(var i=0;i<7;i++){
            if ( schedule[i].startTime == null ) { schedule[i].startTime = '-'; }
            if ( schedule[i].endTime == null ) { schedule[i].endTime = '-'; }
            this.week.push({day:weekDay[i], startTime: schedule[i].startTime, endTime: schedule[i].endTime});
        }
      });
    this.authService.getSchedule();
  }



  //functions related to form control and user validation
  xd1() {
    let username = this.form_recycler.get('username').value;
    if(username != null && username.length > 0){
      this.uniqueUsernameListener = this.authService.getuniqueUsernameListener().subscribe(
        (result) => {
          if ( username == this.currentUser.username ) {
            this.isUnique = true;
          } else {
            this.isUnique = result;
            if(!result){
              this.recycler_usernameError  = "username is taken";
            }
          }
          this.form_recycler.controls['username'].updateValueAndValidity();
        }
      );
      this.authService.checkUserExist(username);
    }
  }
  xd2() {
    let username = this.form_collector.get('username').value;
    if(username != null && username.length > 0){
      this.uniqueUsernameListener = this.authService.getuniqueUsernameListener().subscribe(
        (result) => {
          if ( username == this.currentUser.username ) {
            this.isUnique = true;
          } else {
            this.isUnique = result;
            if(!result){
              this.collector_usernameError  = "username is taken";
            }
          }
          this.form_collector.controls['username'].updateValueAndValidity();
        }
      );
      this.authService.checkUserExist(username);
    }
  }

  setFormGroup() {

      this.form_recycler = new FormGroup({
        'username': new FormControl("", {
          validators: [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9]+$'),
            this.validateUnique.bind(this)
          ]
        }),

        'password': new FormControl("", {
          validators: [
            Validators.minLength(7)
          ]
        }),

        'fullName': new FormControl("", {
          validators: [
            Validators.required,
            Validators.maxLength(100)
          ]
        }),

        'address': new FormControl("", {}),
      });



      this.form_collector = new FormGroup({
        'username': new FormControl("", {
          validators: [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9]+$'),
            this.validateUnique.bind(this)
          ]
        }),

        'password': new FormControl("", {
          validators: [
            Validators.minLength(7)
          ]
        }),

        'fullName': new FormControl("", {
          validators: [
            Validators.required,
            Validators.maxLength(100)
          ]
        }),

        'address': new FormControl("", {
          validators: [
            Validators.required,
            Validators.maxLength(300)
          ]
        }),
      });
  }
  validateRecyclerInput(input: string){
    this.xd1();
    switch (input) {
      case 'recycler_username' :
        if(this.form_recycler.get('username').hasError('required')) {
          this.recycler_usernameError  = "required";
        }
        if (this.form_recycler.get('username').hasError('minlength')) {
          this.recycler_usernameError  = "minimum 7 characters";
        }
        if (this.form_recycler.get('username').hasError('maxlength')) {
          this.recycler_usernameError  = "maximum 20 charecters";
        }
        if (this.form_recycler.get('username').hasError('pattern')) {
          this.recycler_usernameError  = "illegal symbol: number and alphabet only";
        }
        if (this.form_recycler.get('username').hasError('unique')) {
          this.recycler_usernameError  = "username is taken";
        }
        break;

      case 'recycler_password' :
        if(this.form_recycler.get('password').hasError('required')) {
          this.recycler_passwordError = "required";
        }
        if (this.form_recycler.get('password').hasError('minlength')) {
          this.recycler_passwordError = "minimum 7 characters";
        }
        if (this.form_recycler.get('password').hasError('notMatch')) {
          this.recycler_passwordError = "wrong password";
        }
        break;

      case 'recycler_fullName' :
        if(this.form_recycler.get('fullName').hasError('required')) {
          this.recycler_fullNameError  = "required";
        }
        if (this.form_recycler.get('fullName').hasError('maxlength')) {
          this.recycler_fullNameError  = "maximum 100 charecters";
        }
        break;
    }
  }
  validateCollectorInput(input: string){
    this.xd2();
    switch (input) {
      case 'collector_username' :
        if(this.form_collector.get('username').hasError('required')) {
          this.collector_usernameError  = "required";
        }
        if (this.form_collector.get('username').hasError('minlength')) {
          this.collector_usernameError  = "minimum 7 characters";
        }
        if (this.form_collector.get('username').hasError('maxlength')) {
          this.collector_usernameError  = "maximum 20 charecters";
        }
        if (this.form_collector.get('username').hasError('pattern')) {
          this.collector_usernameError  = "illegal symbol: number and alphabet only";
        }
        if (this.form_collector.get('username').hasError('unique')) {
          this.collector_usernameError  = "username is taken";
        }
        break;

      case 'collector_password' :
        if(this.form_collector.get('password').hasError('required')) {
          this.collector_passwordError = "required";
        }
        if (this.form_collector.get('password').hasError('minlength')) {
          this.collector_passwordError = "minimum 7 characters";
        }
        if (this.form_collector.get('password').hasError('notMatch')) {
          this.collector_passwordError = "wrong password";
        }
        break;

      case 'collector_fullName' :
        if(this.form_collector.get('fullName').hasError('required')) {
          this.collector_fullNameError  = "required";
        }
        if (this.form_collector.get('fullName').hasError('maxlength')) {
          this.collector_fullNameError  = "maximum 100 charecters";
        }
        break;

      case 'collector_address' :
        if(this.form_collector.get('address').hasError('required')) {
          this.collector_addressError  = "required";
        }
        if (this.form_collector.get('address').hasError('maxlength')) {
          this.collector_addressError  = "maximum 300 charecters";
        }
        break;
    }
  }
  validateUnique(control: FormControl): ValidationErrors {
    if(this.isUnique == false){
      return {unique: 'not'};
    }
    return null;
  }


  //functions related to schedule table control and validationList
  onClick(selectedCell: any){
    let table     = selectedCell.parentElement;
    let col2      = table.getElementsByTagName("td")[1];
    let col3      = table.getElementsByTagName("td")[2];

    let startTime = col2.innerHTML;
    let endTime   = col3.innerHTML;

    if (selectedCell.getAttribute('editing') == "true" && this.isEditingSched) {
      let cellValue = selectedCell.innerHTML;
      selectedCell.innerHTML = this.timePicker;
      selectedCell.getElementsByClassName("timePicker")[0].value = cellValue;

      selectedCell.getElementsByClassName("timePicker")[0].focus();
      selectedCell.setAttribute('editing', "true");

      let data;
      selectedCell.getElementsByClassName("timePicker")[0].addEventListener("blur", ()=>{
        data = selectedCell.getElementsByClassName("timePicker")[0].value;
        if(data){
          selectedCell.innerHTML = data;
        } else {
          selectedCell.innerHTML = 'edit';
        }
        //selectedCell.setAttribute('editing', "false");



        //add cell validation here
        this.validationList = [];
        this.errorList = [];
        let validationTable = table.parentElement.parentElement.getElementsByTagName('tr');
        for( var i=1; i<=7; i++){
          let col1      = validationTable[i].getElementsByTagName("td")[0];
          let col2      = validationTable[i].getElementsByTagName("td")[1];
          let col3      = validationTable[i].getElementsByTagName("td")[2];
          let isValid;
          let error;
          startTime = col2.innerHTML;
          endTime   = col3.innerHTML;
          if (startTime=='edit'&&endTime!='edit') {
            col2.setAttribute('class', 'haveError');
            isValid = false;
            error = "start time undefined for " + col1.innerHTML;
          }
          if (startTime!='edit'&&endTime=='edit') {
            col3.setAttribute('class', 'haveError');
            isValid = false;
            error = "end time undefined for " + col1.innerHTML;
          }
          if ((startTime=='edit'&&endTime=='edit') || (startTime!='edit'&&endTime!='edit')) {
            col2.setAttribute('class', ' ');
            col3.setAttribute('class', ' ');
            isValid = true;
            error = "";

            if(startTime > endTime) {
              col2.setAttribute('class', 'haveError');
              col3.setAttribute('class', 'haveError');
              isValid = false;
              error = this.timeError;
            }
            if(startTime < endTime) {
              col2.setAttribute('class', ' ');
              col3.setAttribute('class', ' ');
              isValid = true;
              error = "";
            }
          }
          this.errorList.push(error);
          this.validationList.push(isValid);
        }


        this.errorMessage = "";
        for(var error of this.errorList){
          if(error != "" && error != null){
            this.errorMessage = error;
          }
        }
        this.timeIsValid = true;
        for(var valid of this.validationList) {
          if(!valid){
            this.timeIsValid = false;
          }
        }

        /*if(selectedCell.innerHTML == 'edit'){
          selectedCell.setAttribute('edited', 'false');
        } else {
          selectedCell.setAttribute('edited', 'true');
        }*/



        //update table array
        this.result =[];
        for ( let row of table.parentElement.getElementsByTagName("tr")){
          let day = row.getElementsByTagName("td")[0].innerHTML;
          let startTime = row.getElementsByTagName("td")[1].innerHTML;
          let endTime = row.getElementsByTagName("td")[2].innerHTML;

          this.result.push({
            day:row.getElementsByTagName("td")[0].innerHTML,
            startTime:row.getElementsByTagName("td")[1].innerHTML,
            endTime:row.getElementsByTagName("td")[2].innerHTML
          });
        }


      });
    }
  }

  tableLoaded (table: any) {
    if (!this.tableLoadLiao) {
      let table1 = table;
      let week1 = [];
      let weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for(var i=0;i<7;i++){
          week1.push({day:weekDay[i],startTime: 'edit', endTime:"edit"});
      }
      this.result =[];
      for ( let row of table1.getElementsByTagName("tbody")[0].getElementsByTagName('tr')){
        let day = row.getElementsByTagName("td")[0].innerHTML;
        let startTime = row.getElementsByTagName("td")[1].innerHTML;
        let endTime = row.getElementsByTagName("td")[2].innerHTML;

        this.result.push({
          day:row.getElementsByTagName("td")[0].innerHTML,
          startTime:row.getElementsByTagName("td")[1].innerHTML,
          endTime:row.getElementsByTagName("td")[2].innerHTML
        });
      }
    }
    this.tableLoadLiao = true;

      return null;
  }
}
