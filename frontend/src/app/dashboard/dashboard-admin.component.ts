import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'dashboard-admin',
  templateUrl: 'dashboard-admin.component.html',
  styleUrls: ['dashboard-admin.component.css'],
})

export class DashboardAdminComponent {
  constructor(private titleService:Title, public authService: AuthService) {
    this.titleService.setTitle("ESWeb | Admin Dashboard"
    );}


  userName ='';

  ngOnInit(){
      this.authService.setCurrentUrl(window.location.pathname);
    this.userName = this.authService.getFullName();
  }
}
