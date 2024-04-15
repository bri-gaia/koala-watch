import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapPinPagePage } from './map-pin-page.page';

describe('MapPinPagePage', () => {
  let component: MapPinPagePage;
  let fixture: ComponentFixture<MapPinPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPinPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
