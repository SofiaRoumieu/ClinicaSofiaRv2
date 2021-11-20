import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosMisPacientesComponent } from './turnos-mis-pacientes.component';

describe('TurnosMisPacientesComponent', () => {
  let component: TurnosMisPacientesComponent;
  let fixture: ComponentFixture<TurnosMisPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosMisPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosMisPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
