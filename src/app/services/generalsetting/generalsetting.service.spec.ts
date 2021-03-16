import { TestBed } from '@angular/core/testing';

import { GeneralsettingService } from './generalsetting.service';

describe('GeneralsettingService', () => {
  let service: GeneralsettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralsettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
