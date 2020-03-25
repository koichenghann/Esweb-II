import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'dashboard-user',
  templateUrl: 'dashboard-user.component.html',
  styleUrls: ['dashboard-user.component.css'],
})

export class DashboardUserComponent {
  constructor(private titleService:Title, public authService:AuthService) {
    this.titleService.setTitle("ESWeb | User Home"
    );}


    //variable for dynamic data
    userName ='';
    ecolevel = '';
    pointToLevel = '';
    ecoPoints = '';
    pointsNeeded = '333';
    pointsNeededCaption = '';
    upperLevel = 'EcoWarrior';
    upperPoints = 0;
    progress = 0;
    ngOnInit(){
      this.authService.setCurrentUrl(window.location.pathname);
      this.userName = this.authService.getFullName();
      this.pointToLevel = 'Your Points:';

      this.authService.getPointsUpdatedListener().subscribe( result => {
        this.ecolevel = result.ecoLevel.charAt(0).toUpperCase() + result.ecoLevel.slice(1);
        this.ecoPoints = (Math.round(Number(result.totalPoints)*100)/100).toString();

        if ( Number(this.ecoPoints) >= 1000 ) {
          this.upperLevel = 'Eco Warior'
          this.pointsNeeded = '0';
          this.upperPoints = 1000;
        } else if ( Number(this.ecoPoints) >= 500 ) {
          this.upperLevel = 'Eco Warior'
          this.pointsNeeded = (1000 - Number(this.ecoPoints)).toString();
          this.upperPoints = 1000;
        } else if ( Number(this.ecoPoints) >= 100 ) {
          this.upperLevel = 'Eco Hero';
          this.pointsNeeded = (500 - Number(this.ecoPoints)).toString();
            this.upperPoints = 500;
        } else {
          this.upperLevel = 'Eco Saver';
          console.log('ecoPoints: ' + this.ecoPoints );
          this.pointsNeeded = (100 - Number(this.ecoPoints)).toString();
          this.upperPoints = 100;
        }

        this.pointsNeeded = (Math.round(Number(this.pointsNeeded)*100)/100).toString();
        this.progress = 100/this.upperPoints*Number(this.ecoPoints);
        this.pointsNeededCaption = 'Get ' +  this.pointsNeeded + ' more points to unlock ' + this.upperLevel;
        if ( Number(this.ecoPoints) >= 1000 ) {
          this.pointsNeededCaption = 'You have reached the pinnacle of Recycling'
        }
      });
      this.authService.getPoints();



    }

    getUrl(){
      return "url('/src/assets/home-pic/recycler_bla35_169.jpg')"
    }
}
