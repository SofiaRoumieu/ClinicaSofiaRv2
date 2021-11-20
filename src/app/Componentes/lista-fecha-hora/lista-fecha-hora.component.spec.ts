import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFechaHoraComponent } from './lista-fecha-hora.component';

describe('ListaFechaHoraComponent', () => {
  let component: ListaFechaHoraComponent;
  let fixture: ComponentFixture<ListaFechaHoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFechaHoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFechaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
