import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationFieldComponent } from './location-field.component';

describe('LocationFieldComponent', () => {
  let component: LocationFieldComponent;
  let fixture: ComponentFixture<LocationFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LocationFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
