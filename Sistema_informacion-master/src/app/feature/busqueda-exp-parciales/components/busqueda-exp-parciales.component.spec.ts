import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaExpParcialesComponent } from './busqueda-exp-parciales.component';

describe('BusquedaExpParcialesComponent', () => {
  let component: BusquedaExpParcialesComponent;
  let fixture: ComponentFixture<BusquedaExpParcialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaExpParcialesComponent]
    });
    fixture = TestBed.createComponent(BusquedaExpParcialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
