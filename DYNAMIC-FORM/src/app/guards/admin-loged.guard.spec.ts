import { TestBed } from '@angular/core/testing';

import { AdminLogedGuard } from './admin-loged.guard';

describe('AdminLogedGuard', () => {
  let guard: AdminLogedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminLogedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
