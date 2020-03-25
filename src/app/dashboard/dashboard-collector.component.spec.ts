import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCollectorComponent } from './dashboard-collector.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('DashboardCollectorComponent', () => {
    let component: DashboardCollectorComponent;
    let fixture: ComponentFixture<DashboardCollectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardCollectorComponent],
            imports:[RouterTestingModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardCollectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
