import { Injectable, OnInit } from '@angular/core';
import { ScheduleData } from './schedule-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from './user-data.model';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  uniqueUsernameListener = new Subject<boolean>();
  authStatusListener = new Subject<boolean>();
  collectorMaterialListener = new Subject<any>();
  MaterialUpdatedListener = new Subject<boolean>();
  recyclerExistListener = new Subject<any>();
  pointsUpdatedLisetener = new Subject<any>();
  isValid = false;


  private username: string;
  private fullName: string;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userType: string;

  private tempCollectorSignupDetail: UserData;

  ngOnInit(): void {}

  constructor(private http: HttpClient, private router: Router) { }

  getuniqueUsernameListener() {
    return this.uniqueUsernameListener.asObservable();
  }
  getauthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getIsAuth(){
    return this.getAuthData() != null;
  }
  getUserType(){
    if (this.getIsAuth()) {
        return this.getAuthData().userType;
    }
    return null;
  }
  getTempCol() {
    return this.getCollector();
  }
  removeTempCol() {
    localStorage.removeItem('tempCol');
  }
  getUserId() {
    if ( this.getIsAuth() ) {
      return this.getAuthData().userId;
    }
    return null;
  }
  getUsername() {
    if ( this.getIsAuth() ) {
      return this.getAuthData().username;
    }
    return null;
  }
  getFullName() {
    if ( this.getIsAuth() ) {
      return this.getAuthData().fullName;
    }
    return null;
  }
  getCollectorMaterialUpdatedListener(){
    return this.collectorMaterialListener.asObservable();
  }


  getPoints() {
    this.http.post<{totalPoints: number, ecoLevel: string}>(
      BACKEND_URL + "/getUser",
      {_id: this.getUserId()}
    )
    .subscribe( result => {
      this.pointsUpdatedLisetener.next(result);
    });
  }
  getPointsUpdatedListener() {
    return this.pointsUpdatedLisetener.asObservable();
  }


  getRecyclerExistListener() {
    return this.recyclerExistListener.asObservable();
  }
  checkRecyclerExist(username){
    this.http.post<any>(
      BACKEND_URL + "/findUser",
      { username: username})
      .subscribe( result => {
        //console.log(result[0]);
        if( result.length>0 && result[0].userType == 'recycler' ) {
            this.recyclerExistListener.next(result[0]);
            console.log('recycler found: ' + result[0]);
        }
      });
  }


  getRecyclers() {
    return this.http.post<any>( BACKEND_URL + "/getRecyclers", {});
  }



  getCollectorMaterials() {
    //console.log("get material");
    let userID = this.getUserId();
    //console.log("uid" + userID);
    this.http
      .post<{materials:any}>( BACKEND_URL +  '/getCollectorMaterial', { userID: userID } )
      .subscribe( result => {
        if ( result ) {
          //console.log('getMaterial: ');
          //console.log(result);
          this.collectorMaterialListener.next(result.materials);
        }  else {
          this.collectorMaterialListener.next(false);
        }
      });
    //return this.http.post( 'http://localhost:3000/api/user/getMaterials', userID );
  }





  private userRetrieved = new Subject<{username: string, fullName: string, totalPoints: number, ecoLevel: string, address: string}>();
  getUserIsRetrieved() {
    return this.userRetrieved.asObservable();
  }
  getUser() {
    this.http.post<{username: string, fullName: string, totalPoints: number, ecoLevel: string, address: string}>( BACKEND_URL + "/getUser", { _id: this.getUserId() }).subscribe(
      result => {
        if ( result ) {
          this.userRetrieved.next(result);
        } else {
          this.userRetrieved.next(null);
        }
      },
      error => {
        this.userRetrieved.next(null);
      }
    );
  }



  private scheduleRetrieved = new Subject<{day: string, startTime: string, endTime: string}[]>();
  getScheduleIsRetrieved() {
    return this.scheduleRetrieved.asObservable();
  }
  getSchedule() {
    this.http.post<{day: string, startTime: string, endTime: string}[]>(BACKEND_URL + '/getSchedule', {userId: this.getUserId()})
    .subscribe( result => {
      if ( result ) {
        this.scheduleRetrieved.next(result);
      } else {
        this.scheduleRetrieved.next(null);
      }
    }
    , error => {
      this.scheduleRetrieved.next(null);
    });
  }



  updateProfile(userData: any){
    //console.log("user data      : " + JSON.stringify(userData));
    //console.log("sched data     : " + scheduleData);
    //console.log("password null  : " + (userData.password==null||userData.password==""));

    let passwordChanged = !(userData.password==null||userData.password=="");
    let userId = this.getUserId();

     this.http
      .post(
        BACKEND_URL + "/updateProfile",
        { userData, userId }
      )
      .subscribe( result => {

        //not defined
      }, error => {
        console.log(error);//no defined
      } );
  }
  updateSchedule( scheduleData:any, userId: string ){
    this.http
      .post(
        BACKEND_URL + "/updateSchedule",
        { scheduleData, userId }
      )
      .subscribe(
        result => {
          //not defined
        },
        error => {
          console.log(error);
        }
      );
  }
  updateMaterial( materials: any, userId: string ){
    this.http
      .post(
        BACKEND_URL + "/updateCollectorMaterial",
        { materials, userId }
      )
      .subscribe(
        result => {
          console.log('this ran')
          this.getCollectorMaterials();
        },
        error => {

        }
      );
  }






  createColPart1(username: string, password: string, fullName: string, address: string, schedule: string, userType: string){
    this.tempCollectorSignupDetail = {
      username:username,
      password:password,
      fullName:fullName,
      totalPoints:null,
      ecoLevel: null,
      address:address,
      schedule:schedule,
      userType:userType
    };
    this.saveCollector(this.tempCollectorSignupDetail);
    this.router.navigate(['/auth/schedule']);

  }
  createColPart2(userData: UserData, scheduleData: ScheduleData[]) {
    //console.log('part 2 ran');
    let collectorData = {userData, scheduleData};
    this.http
      .post(BACKEND_URL + "/createCollector", collectorData)
      .subscribe( result =>{
          //console.log('schedule created successfully, id: ' + result);
          alert("Signup Succesfull.\nRedirecting to login page.");
          this.router.navigate(['/auth/login']);
      }, error => {
        //console.log('create collector post failed: ' + error.message );
        alert('Account not created.\nError occured during user createion.\nRedirecting to Signup page.');
        this.router.navigate(['/auth/signup']);
      });
    this.removeTempCol();
    return false;
  }

  cancelCollectorSignup() {
    //this.router.navigate(["/auth/login"]);
  }
  private saveCollector(collector:UserData){
    localStorage.setItem('tempCol', JSON.stringify(collector));
  }
  private clearCollector(){
    localStorage.removeItem('tempCol')
  }
  private getCollector(){
    return JSON.parse(localStorage.getItem('tempCol')) as UserData;
  }



  createUser(username: string, password: string, fullName: string, address: string, schedule: string, userType:string){
    //console.log('reached auth service');
    if(userType == "recycler"){
      let userData: UserData = {
        username: username,
        password: password,
        fullName: fullName,
        totalPoints: null,
        ecoLevel: null,
        address: null,
        schedule: null,
        userType: userType
      }
      this.http
        .post(BACKEND_URL + "/signup", userData)
        .subscribe(() => {
          this.router.navigate(["/auth/login"]);
        }, error => {
          console.log('something about auth status listener: ' + error.message);
        });
    }

    else {
      let userData: UserData = {
        username: username,
        password: password,
        fullName: fullName,
        totalPoints: null,
        ecoLevel: null,
        address: address,
        schedule: null,
        userType: userType
      }
      this.http
        .post(BACKEND_URL + "/signup", userData)
        .subscribe(() => {
          this.router.navigate(["/auth/login"]);
        }, error => {
          console.log('something about auth status listener: ' + error.message);
        });
    }
  }


  private userFound = true;
  checkUserExist(username: String){
    this.http.get<{userFound: String}>(BACKEND_URL + "/checkUserExist/" + username).subscribe(
      (result) => {
        if(result.userFound){
          this.uniqueUsernameListener.next(false);
        } else {
          this.uniqueUsernameListener.next(true);
        }
      }
    )
  }



  checkCredentialValidity(username: string, password: string){
    const credential = {username: username, password: password};

    this.http
      .post<{token: string, expiresIn: number, username:string, fullName:string, userId: string, userType: string}>(
        BACKEND_URL + "/login", credential
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          console.log("expires in: " + expiresInDuration);
          this.isValid = true;
          this.userId = response.userId;
          this.userType = response.userType;
          this.username = response.username;
          this.fullName = response.fullName;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log("expired on " + expirationDate);
          this.saveAuthData(token, expirationDate, this.username,this.fullName, this.userId, this.userType);
          //this.router.navigate();
          if (this.userType == 'recycler') {
            this.router.navigate(['/dashboard-user']);
          }
          else if  (this.userType == 'admin') {
            this.router.navigate(['/dashboard-admin']);
          }
          else {
            this.router.navigate(['/dashboard-collector']);
          }
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }


  logout(){
    this.clearAuthData()
    this.token = null;
    this.tokenTimer = null;
    this.userId = null;
    this.userType = null;
    this.authStatusListener.next(false);
  }



  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date, username:string, fullName:string, userId: string, userType: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');
    const fullName = localStorage.getItem('fullName');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');


    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      username: username,
      fullName: fullName,
      userId: userId,
      userType: userType
    }
  }

  findUser(username) {
    return this.http.post(BACKEND_URL + "/findUser", { username: username });
  }


  setCurrentUrl(curr: string){
    if( this.getCurrentUrl() != curr ) {
        this.setPrevUrl(this.getCurrentUrl());
    }
    localStorage.setItem('currUrl', curr);
  }
  getCurrentUrl(){
    return localStorage.getItem('currUrl');
  }
  setPrevUrl(prev:string){
    localStorage.setItem('prevUrl', prev);
  }
  getPrevUrl(){
    return localStorage.getItem('prevUrl');
  }
}
