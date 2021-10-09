import { TestBed } from '@angular/core/testing';

import { CartemptyGuard } from './cartempty.guard';

describe('CartemptyGuard', () => {
  let guard: CartemptyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CartemptyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
