import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserComponent } from './dashboard-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardUserComponent', () => {
    let component: DashboardUserComponent;
    let fixture: ComponentFixture<DashboardUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardUserComponent],
            imports:[RouterTestingModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
