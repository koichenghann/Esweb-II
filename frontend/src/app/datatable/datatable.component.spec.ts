import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableComponent } from './datatable.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('DatatableComponent', () => {
    let component: DatatableComponent;
    let fixture: ComponentFixture<DatatableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatatableComponent],
            imports: [MatDialogModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatatableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
