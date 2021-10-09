import { TestBed } from '@angular/core/testing';

import { PasswordResetGuard } from './password-reset.guard';

describe('PasswordResetGuard', () => {
  let guard: PasswordResetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PasswordResetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
