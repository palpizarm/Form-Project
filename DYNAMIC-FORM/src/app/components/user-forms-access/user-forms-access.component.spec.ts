import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormsAccessComponent } from './user-forms-access.component';

describe('UserFormsAccessComponent', () => {
  let component: UserFormsAccessComponent;
  let fixture: ComponentFixture<UserFormsAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormsAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormsAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
