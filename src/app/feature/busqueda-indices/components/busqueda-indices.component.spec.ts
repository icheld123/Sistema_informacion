import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaIndicesComponent } from './busqueda-indices.component';

describe('BusquedaIndicesComponent', () => {
  let component: BusquedaIndicesComponent;
  let fixture: ComponentFixture<BusquedaIndicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaIndicesComponent]
    });
    fixture = TestBed.createComponent(BusquedaIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
