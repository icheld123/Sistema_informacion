import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaExpTotalesComponent } from './busqueda-exp-totales.component';

describe('BusquedaExpTotalesComponent', () => {
  let component: BusquedaExpTotalesComponent;
  let fixture: ComponentFixture<BusquedaExpTotalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaExpTotalesComponent]
    });
    fixture = TestBed.createComponent(BusquedaExpTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
