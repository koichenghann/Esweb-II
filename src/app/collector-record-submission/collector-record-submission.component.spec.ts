import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorRecordSubmissionComponent } from './collector-record-submission.component';

describe('CollectorRecordSubmissionComponent', () => {
  let component: CollectorRecordSubmissionComponent;
  let fixture: ComponentFixture<CollectorRecordSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorRecordSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorRecordSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
