import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosProfesionalComponent } from './horarios-profesional.component';

describe('HorariosProfesionalComponent', () => {
  let component: HorariosProfesionalComponent;
  let fixture: ComponentFixture<HorariosProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
