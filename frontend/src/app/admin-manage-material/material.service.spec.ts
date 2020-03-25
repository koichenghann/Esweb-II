import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { MaterialsService } from './material.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('MaterialsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialsService],
      imports:[RouterTestingModule, HttpClientTestingModule, HttpClientModule]
    });
  });

  it('should be created', inject([MaterialsService], (service: MaterialsService) => {
    expect(service).toBeTruthy();
  }));
});
