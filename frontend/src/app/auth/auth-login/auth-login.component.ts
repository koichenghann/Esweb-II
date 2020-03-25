import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  hide = true;
  form: FormGroup;

  //var for error message
  initialError = "required"
  usernameError = this.initialError;
  passwordError = this.initialError;

  isValid = true;
  private credentialIsValid: Subscription;

  constructor(private authService: AuthService) { }



  ngOnInit(): void {
      this.authService.setCurrentUrl(window.location.pathname);
    //validators//
    this.authService.logout();

    this.form = new FormGroup({
      'username': new FormControl("", {
        validators: [
          Validators.required,
          this.validateAuth.bind(this)
        ]
      }),

      'password': new FormControl("", {
        validators: [
          Validators.required,
          this.validateAuth.bind(this)
        ]
      })
    });
  }




  onLogin() {
    //if (this.form.invalid){ return; }

    this.isValid = false;
    let username = this.form.get('username').value;
    let password = this.form.get('password').value;



    this.authService.checkCredentialValidity(username, password);
    this.authService.authStatusListener.subscribe(
      response => {
        console.log("RESPONSE: " + response);
        if (response) {
          this.isValid = true;
          this.validateLoginField();
        }
        else {
          this.validateLoginField();
        }
      }
    )
    //this.validateLoginField();
    console.log("this is after return");
    return;
  }

validateAuth(control: FormControl): ValidationErrors {
  if(this.isValid){
    return null;
  }
  console.log(control.value);
  return {invalid: true};
}



  //custom validation response
  validateInput(input: string){
    switch (input) {
      case 'username' :
        if(this.form.get('username').hasError('required')) {
          this.usernameError  = "required";
        }
        break;

      case 'password' :
        if(this.form.get('password').hasError('required')) {
          this.passwordError = "required";
        }
        break;
    }
  }

  validateLoginField(){
    this.form.controls['username'].updateValueAndValidity();
    this.form.controls['password'].updateValueAndValidity();
    if(this.form.get('username').hasError('invalid')) {
      this.usernameError  = "invalid username or password";
    }
    if(this.form.get('password').hasError('invalid')) {
      this.passwordError = "invalid username or password";
    }
  }





  //only required in login page
  validatePassword(control: FormControl): ValidationErrors {
    return null;
    return {
      notMatch: 'short short'
    };
  }

}
