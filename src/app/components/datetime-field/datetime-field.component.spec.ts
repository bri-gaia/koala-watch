import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatetimeFieldComponent } from './datetime-field.component';

describe('DatetimeFieldComponent', () => {
  let component: DatetimeFieldComponent;
  let fixture: ComponentFixture<DatetimeFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatetimeFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatetimeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
