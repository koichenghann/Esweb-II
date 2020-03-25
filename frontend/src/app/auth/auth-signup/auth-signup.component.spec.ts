import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupComponent } from './auth-signup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthSignupComponent', () => {
    let component: AuthSignupComponent;
    let fixture: ComponentFixture<AuthSignupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthSignupComponent],
            imports:[RouterTestingModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthSignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
