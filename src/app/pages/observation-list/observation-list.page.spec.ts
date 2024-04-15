import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationListPage } from './observation-list.page';

describe('ObservationListPage', () => {
  let component: ObservationListPage;
  let fixture: ComponentFixture<ObservationListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
