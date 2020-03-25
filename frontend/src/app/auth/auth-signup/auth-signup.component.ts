import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  hide = true;
  form_recycler: FormGroup;
  form_collector: FormGroup;
  start1;
  result;
  isUnique = true;
  selectedIndex = "0";

  //var for error message
  initialError = 'required';
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

  constructor(private router: Router, public authService: AuthService) { }



  ngOnInit(): void {
    this.authService.setCurrentUrl(window.location.pathname);
    //validators//
    this.authService.logout();
    this.setFormGroup();
    //this.selectedIndex = "1";
    //check if existing col signup
    this.initialiseCol();
  }

  initialiseCol() {
    if(this.authService.getTempCol()){
      let theCol = this.authService.getTempCol();
      this.selectedIndex = "1";
      this.form_collector.get('username').setValue(theCol.username);
      this.form_collector.get('password').setValue(theCol.password);
      this.form_collector.get('fullName').setValue(theCol.fullName);
      this.form_collector.get('address').setValue(theCol.address);
    }
  }

  xd1() {
    let username = this.form_recycler.get('username').value;
    if(username != null && username.length > 0){
      this.uniqueUsernameListener = this.authService.getuniqueUsernameListener().subscribe(
        (result) => {
          this.isUnique = result;
          if(!result){
            this.recycler_usernameError  = "username is taken";
          }
          this.form_recycler.controls['username'].updateValueAndValidity();
          console.log("is unique: " + result);
          //this.recycler_usernameError  = "username is taken";
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
          this.isUnique = result;
          if(!result){
            this.collector_usernameError  = "username is taken";
          }
          this.form_collector.controls['username'].updateValueAndValidity();
          //this.collector_usernameError  = "username is taken";
        }
      );
      this.authService.checkUserExist(username);
    }
  }


  onCollectorSignup() {
    if (this.form_collector.invalid) {
      return;
    }

    let username  = this.form_collector.get('username').value;
    let password  = this.form_collector.get('password').value;
    let fullName  = this.form_collector.get('fullName').value;
    let address   = this.form_collector.get('address').value;
    let schedule  = null;
    let userType  = "collector";


    this.authService.createColPart1(username, password, fullName, address, schedule, userType);
    //this.form_collector.reset();
  }

  onRecyclerSignup() {
    if (this.form_recycler.invalid) {
      return;
    }

    let username  = this.form_recycler.get('username').value;
    let password  = this.form_recycler.get('password').value;
    let fullName  = this.form_recycler.get('fullName').value;
    let address   = null;
    let schedule  = null;
    let userType  = "recycler";


    this.authService.createUser(username, password, fullName, address, schedule, userType);
    //this.form_recycler.reset();
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
            Validators.required,
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
            Validators.required,
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

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.setFormGroup();
    this.form_recycler.reset();
    this.form_collector.reset();
    this.authService.removeTempCol();
  }

  //custom validation response
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





  //custom validation template
  validateUnique(control: FormControl): ValidationErrors {
    if(this.isUnique == false){
      return {unique: 'not'};
    }
    return null;
  }


  //only required in login page
  validatePassword(control: FormControl): ValidationErrors {
    return null;
    return {
      notMatch: 'short short'
    };
  }
}
