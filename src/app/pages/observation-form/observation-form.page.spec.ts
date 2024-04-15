import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationFormPage } from './observation-form.page';

describe('ObservationFormPage', () => {
  let component: ObservationFormPage;
  let fixture: ComponentFixture<ObservationFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
