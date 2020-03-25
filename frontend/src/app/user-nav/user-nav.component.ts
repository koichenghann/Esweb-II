import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public auhtService: AuthService) {}

    userType    = this.auhtService.getUserType();
    list_item_1 = '';
    list_item_2 = '';
    list_item_3 = '';
    list_item_4 = '';
    list_item_5 = '';
    list_item_6 = '';

    route1;
    route2;
    route3;
    route4;
    route5;
    route6;


    titleName(){
      if (this.userType=='collector'){
        return 'ESWEB | Collector';
      }

      if (this.userType=='recycler'){
        return 'ESWEB | Recycler';
      }

    }
    ngOnInit(){

      if (this.userType=='collector'){
        this.list_item_1 = 'Dashboard';
        this.list_item_2 = 'Manage Profile';
        this.list_item_3 = 'Submission History';
        this.list_item_4 = 'View All Appointment';
        this.list_item_5 = 'Add New Collection';
        this.list_item_6 = 'Logout';

        this.route1 = '/dashboard-collector';
        this.route2 = '/manage-profile';
        this.route3 = '/history';
        this.route4 = '/record-submission';
        this.route5 = '/add-submission';
        this.route6 = '';

      }

      if (this.userType=='recycler'){
        this.list_item_1 = 'Dashboard';
        this.list_item_2 = 'Manage Profile';
        this.list_item_3 = 'Submission History';
        this.list_item_4 = 'View All Appointments';
        this.list_item_5 = 'Add new Appointment';
        this.list_item_6 = 'Logout';

        this.route1 = '/dashboard-user';
        this.route2 = '/manage-profile';
        this.route3 = '/history';
        this.route4 = '/record-submission';
        this.route5 = '/make-appointment';
        this.route6 = '';

      }


    }

    logout(){
      this.auhtService.logout();
    }


}
