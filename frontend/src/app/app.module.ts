//angular-module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from  "@angular/common/http";

//angular-material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import  { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


//angular-component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardSideNavComponent } from './dashboard/dashboard-sidenav/dashboard-sidenav.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard/dashboard-user.component';
import { DashboardCollectorComponent } from './dashboard/dashboard-collector.component';
import { DatatableComponent } from './datatable/datatable.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { AdminManageMaterialComponent } from './admin-manage-material/admin-manage-material.component';
import { MakeAppointmentComponent } from './user-make-appointment/user-make-appointment.component';

//import { LogoutDialogComponent } from './dashboard/dashboard-sidenav/dashboard-sidenav.component';
import { CreateMaterialFormComponent } from './datatable/create-material-form/create-material-form.component';
import { MaterialFormComponent } from './admin-manage-material/material-form/material-form';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthScheduleComponent } from './auth/auth-schedule/auth-schedule.component';
import { ProfileComponent } from './profile/profile.component';

//service
import { MaterialsService } from './admin-manage-material/material.service';
import { NotificationService } from './admin-manage-material/notification.service';
import { AddCollectorMaterialDialogComponent } from './add-collector-material-dialog/add-collector-material-dialog.component';
import { HistoryComponent } from './history/history.component';
import { CollectorRecordSubmissionComponent } from './collector-record-submission/collector-record-submission.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardSideNavComponent,
    DashboardAdminComponent,
    DatatableComponent,
    UserNavComponent,
    DashboardUserComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    AuthScheduleComponent,
    DashboardCollectorComponent,
    AdminManageMaterialComponent,
    CreateMaterialFormComponent,
    ProfileComponent,
    MaterialFormComponent,
    AddCollectorMaterialDialogComponent,
    HistoryComponent,
    MakeAppointmentComponent,
    CollectorRecordSubmissionComponent,

    //LogoutDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [HttpClientModule],
  providers: [/*AdminManageMaterialService*/],
  bootstrap: [AppComponent],
  entryComponents: [CreateMaterialFormComponent,AdminManageMaterialComponent, AddCollectorMaterialDialogComponent ]
})
export class AppModule { }
