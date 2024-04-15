import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CensusFormPage } from './census-form.page';

describe('CensusFormPage', () => {
  let component: CensusFormPage;
  let fixture: ComponentFixture<CensusFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CensusFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
