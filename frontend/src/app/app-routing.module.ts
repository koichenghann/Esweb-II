import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAdminComponent } from './dashboard/dashboard-admin.component';
import { HomeComponent } from './home/home.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { DashboardUserComponent } from './dashboard/dashboard-user.component';
import { DashboardCollectorComponent } from './dashboard/dashboard-collector.component';
import { AdminManageMaterialComponent } from './admin-manage-material/admin-manage-material.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthScheduleComponent } from './auth/auth-schedule/auth-schedule.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { MakeAppointmentComponent } from './user-make-appointment/user-make-appointment.component';
import { CollectorRecordSubmissionComponent } from './collector-record-submission/collector-record-submission.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'prefix'},
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'dashboard-admin',component: DashboardAdminComponent, canActivate: [AuthGuard]},
  { path: 'auth/login',component: AuthLoginComponent, canActivate: [AuthGuard]},
  { path: 'auth/signup',component: AuthSignupComponent, canActivate: [AuthGuard]},
  { path: 'auth/schedule', component: AuthScheduleComponent, canActivate: [AuthGuard]},
  { path: 'manage-profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard]},
  { path: 'dashboard-collector', component: DashboardCollectorComponent,  canActivate: [AuthGuard]},
  { path: 'admin/manage-material', component: AdminManageMaterialComponent, canActivate: [AuthGuard]},
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'make-appointment', component: MakeAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'record-submission', component: CollectorRecordSubmissionComponent, canActivate: [AuthGuard] },
  { path: 'add-submission', component: CollectorRecordSubmissionComponent, canActivate: [AuthGuard] },

  //{ path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [HomeComponent, DashboardAdminComponent, DashboardUserComponent]
