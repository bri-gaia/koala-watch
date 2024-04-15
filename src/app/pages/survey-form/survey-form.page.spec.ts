import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyFormPage } from './survey-form.page';

describe('SurveyFormPage', () => {
  let component: SurveyFormPage;
  let fixture: ComponentFixture<SurveyFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
