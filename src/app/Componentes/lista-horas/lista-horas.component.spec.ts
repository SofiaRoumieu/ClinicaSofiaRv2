import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHorasComponent } from './lista-horas.component';

describe('ListaHorasComponent', () => {
  let component: ListaHorasComponent;
  let fixture: ComponentFixture<ListaHorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaHorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
