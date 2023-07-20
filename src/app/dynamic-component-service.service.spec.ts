import { TestBed } from '@angular/core/testing';

import { DynamicComponentServiceService } from './dynamic-component-service.service';

describe('DynamicComponentServiceService', () => {
  let service: DynamicComponentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
