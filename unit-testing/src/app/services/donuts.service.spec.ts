import { TestBed } from '@angular/core/testing';

import { DonutsService } from './donuts.service';

describe('DonutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonutsService = TestBed.get(DonutsService);
    expect(service).toBeTruthy();
  });
});
