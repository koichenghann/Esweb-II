import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginComponent } from './auth-login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthLoginComponent', () => {
    let component: AuthLoginComponent;
    let fixture: ComponentFixture<AuthLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthLoginComponent],
            imports:[RouterTestingModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
