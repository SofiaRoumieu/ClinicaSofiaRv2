import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTurnoComponent } from './ver-turno.component';

describe('VerTurnoComponent', () => {
  let component: VerTurnoComponent;
  let fixture: ComponentFixture<VerTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
