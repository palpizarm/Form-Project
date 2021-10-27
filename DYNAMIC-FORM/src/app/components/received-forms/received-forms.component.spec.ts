import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedFormsComponent } from './received-forms.component';

describe('ReceivedFormsComponent', () => {
  let component: ReceivedFormsComponent;
  let fixture: ComponentFixture<ReceivedFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
