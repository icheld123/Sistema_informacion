import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaLinealBinariaComponent } from './busqueda-lineal-binaria.component';

describe('BusquedaLinealBinariaComponent', () => {
  let component: BusquedaLinealBinariaComponent;
  let fixture: ComponentFixture<BusquedaLinealBinariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaLinealBinariaComponent]
    });
    fixture = TestBed.createComponent(BusquedaLinealBinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
