import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageMaterialComponent } from './admin-manage-material.component';

describe('AdminManageMaterialComponent', () => {
    let component: AdminManageMaterialComponent;
    let fixture: ComponentFixture<AdminManageMaterialComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminManageMaterialComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminManageMaterialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});