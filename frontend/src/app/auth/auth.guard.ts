import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const prev = this.authService.getPrevUrl();
      const curr = this.authService.getCurrentUrl();
      const isAuth = this.authService.getIsAuth();
      const userType = this.authService.getUserType();
      const targetUrl = next.url;
      //const currentUrl = state.url;

      console.log("[route-guard] is Auth  :" + isAuth);
      console.log("[route-guard] switch on:" + state.url);

      //let accessible = false;
      switch (targetUrl.toString()) {
        case 'history':
          if ( isAuth ) {
            return true;
          }
          this.router.navigate([curr]);
          return false;
          break;

        case 'make-appointment':
          if ( isAuth && userType == 'recycler' ) {
            return true;
          }
          this.router.navigate([curr]);
          return false;
          break;

        case 'record-submission':
          if ( isAuth && userType != 'admin' ) {
            return true;
          }
          this.router.navigate([curr]);
          return false;
          break;

        case 'add-submission':
          if ( isAuth && userType == 'collector' ) {
            return true;
          }
          this.router.navigate([curr]);
          return false;
          break;

        case 'dashboard-user':
          if (userType == 'recycler' && isAuth) {
            return true;
          }
          this.router.navigate([curr]);
          return false;
          break;

        case 'dashboard-collector':
          if (userType == 'collector' && isAuth) {
            return true;
          }
          this.router.navigate([curr]);
          return false;
          break;

        case 'dashboard-admin':
          if (userType == 'admin' && isAuth) {
            return true;
          }
          this.router.navigate([curr]);
          return false;
          break;


        case 'admin,manage-material':

          if (userType == 'admin' && isAuth) {
            return true;
          }
          this.router.navigate([curr]);
          return false;
          break;

        case 'auth,login':
          //let currentUrl = state.url

          if(isAuth){
            if(curr == '/home') {
              if (userType == 'collector') {
                this.router.navigate(['/dashboard-collector']);
              }
              else if(userType == 'recycler') {
                this.router.navigate(['/dashboard-user']);
              }
              else if(userType == 'admin') {
                this.router.navigate(['/dashboard-admin']);
              }
              return false;
            }

            if(confirm("Do you want to log out?")){
              this.authService.logout();
              return true;
            } else {
              this.router.navigate([curr]);
              return false;
            }
          }
          return true;
          break;


        case 'auth,signup':
          //let currentUrl = state.url
          if(isAuth){
            if(curr == '/home') {
              if (userType == 'collector') {
                this.router.navigate(['/dashboard-collector']);
              }
              else if(userType == 'recycler') {
                this.router.navigate(['/dashboard-user']);
              }
              else if(userType == 'admin') {
                this.router.navigate(['/dashboard-admin']);
              }
              return false;
            }

            if(confirm("Do you want to log out?")){
              return true;
            } else {
              this.router.navigate([prev]);
              return false;
            }
          }
          return true;
          break;


        case 'manage-profile':
          //let currentUrl = state.url
          if(isAuth){
            return true;
          } else {
            this.router.navigate([prev]);
            return false;
          }

          return true;
          break;


        case 'auth,schedule':
          if(this.authService.getTempCol()){
            return true;
          } else {
              this.router.navigate([prev]);
              return false;
          }
          return false;
          break;
      }
      return false;


//add auth guard for login and signup...
/*
      if (accessible) {
        return accessible;
      }

      this.router.navigate(['/auth/login']);
      return false;
*/
      //console.log("[route-guard] is Auth  :" + isAuth);
      //console.log("[route-guard] not-Auth : auth guard is applied but haven't been set up, please set up the guard criteria");
      //return false;
      //console.log("[route-guard] end:" + next.url);
      //this.router.navigate(['/auth/login']);
      //return false;

      //console.log("[route-guard] switch on:" + targetUrl);
      //console.log("[route-guard] user type:" + userType);
      //console.log("[route-guard] is Auth  :" + isAuth);
  }

}
