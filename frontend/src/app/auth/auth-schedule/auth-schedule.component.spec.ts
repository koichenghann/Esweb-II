import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthScheduleComponent } from './auth-schedule.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthScheduleComponent', () => {
    let component: AuthScheduleComponent;
    let fixture: ComponentFixture<AuthScheduleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthScheduleComponent],
            imports:[RouterTestingModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthScheduleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
