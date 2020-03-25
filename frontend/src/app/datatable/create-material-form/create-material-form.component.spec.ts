import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaterialFormComponent } from './create-material-form.component';

describe('CreateMaterialFormComponent', () => {
    let component: CreateMaterialFormComponent;
    let fixture: ComponentFixture<CreateMaterialFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateMaterialFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateMaterialFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});