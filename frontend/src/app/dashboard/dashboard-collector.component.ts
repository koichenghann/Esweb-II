import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'dashboard-collector',
  templateUrl: 'dashboard-collector.component.html',
  styleUrls: ['dashboard-collector.component.css'],
})

export class DashboardCollectorComponent implements OnInit{
  constructor(private titleService:Title, public authService: AuthService) {
    this.titleService.setTitle("ESWeb | Collector's Dashboard"
    );}


    //variable for dynamic data
    username = ''
    ecolevel = '';
    pointToLevel = '';
    ecoPoints = '';
    pointsNeeded = '333';
    pointsNeededCaption = '';
    upperLevel = 'EcoWarrior';
    ngOnInit(){

      this.authService.getPointsUpdatedListener().subscribe( result => {
        this.ecolevel = result.ecoLevel;
        this.ecoPoints = (Math.round(Number(result.totalPoints)*100)/100).toString();
      });
      this.authService.getPoints();

      this.authService.setCurrentUrl(window.location.pathname);
      this.username = this.authService.getFullName();

      this.pointToLevel = 'Your Points:';

      this.pointsNeededCaption = 'Get ' +  this.pointsNeeded + ' more points to unlock ' + this.upperLevel;
    }
}
