import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminComponent } from './dashboard-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


describe('DashboardAdminComponent', () => {
    let component: DashboardAdminComponent;
    let fixture: ComponentFixture<DashboardAdminComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardAdminComponent],
            imports: [RouterTestingModule,HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
