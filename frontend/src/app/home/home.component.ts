import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit{
  isAuth;
  constructor(private titleService:Title, public authService: AuthService) {
    this.titleService.setTitle("ESWeb | Home"
    );}

    ngOnInit(): void {
        this.authService.setCurrentUrl(window.location.pathname);
      this.isAuth = this.authService.getIsAuth();
    }

    logout(){
      this.authService.logout();
    }

}
