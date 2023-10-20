import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTransfClavesComponent } from './busqueda-transf-claves.component';

describe('BusquedaTransfClavesComponent', () => {
  let component: BusquedaTransfClavesComponent;
  let fixture: ComponentFixture<BusquedaTransfClavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaTransfClavesComponent]
    });
    fixture = TestBed.createComponent(BusquedaTransfClavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
