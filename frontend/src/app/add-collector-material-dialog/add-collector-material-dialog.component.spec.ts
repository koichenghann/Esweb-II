import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectorMaterialDialogComponent } from './add-collector-material-dialog.component';

describe('AddCollectorMaterialDialogComponent', () => {
  let component: AddCollectorMaterialDialogComponent;
  let fixture: ComponentFixture<AddCollectorMaterialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollectorMaterialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollectorMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
