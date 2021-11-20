import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTurnoDetalleComponent } from './ver-turno-detalle.component';

describe('VerTurnoDetalleComponent', () => {
  let component: VerTurnoDetalleComponent;
  let fixture: ComponentFixture<VerTurnoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTurnoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTurnoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
