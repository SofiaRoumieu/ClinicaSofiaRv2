import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionCuentaComponent } from './verificacion-cuenta.component';

describe('VerificacionCuentaComponent', () => {
  let component: VerificacionCuentaComponent;
  let fixture: ComponentFixture<VerificacionCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
