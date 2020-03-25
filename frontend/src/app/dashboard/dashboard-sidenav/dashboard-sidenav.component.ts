import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.css']
})
export class DashboardSideNavComponent {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}

/*
export class LogoutDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(){
    const dialogRef = this.dialog.open(DialogLogoutContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'logout-dialog',
  templateUrl: 'logout-dialog.html',
})
export class DialogLogoutContent {}
*/
