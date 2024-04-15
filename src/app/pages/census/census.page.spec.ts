import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CensusPage } from './census.page';

describe('CensusPage', () => {
  let component: CensusPage;
  let fixture: ComponentFixture<CensusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CensusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
