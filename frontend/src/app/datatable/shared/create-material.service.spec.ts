import { TestBed, inject } from '@angular/core/testing';

import { CreateMaterialService } from './create-material.service';

describe('CreateMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateMaterialService]
    });
  });

  it('should be created', inject([CreateMaterialService], (service: CreateMaterialService) => {
    expect(service).toBeTruthy();
  }));
});