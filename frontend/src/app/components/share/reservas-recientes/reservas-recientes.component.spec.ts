import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasRecientesComponent } from './reservas-recientes.component';

describe('ReservasRecientesComponent', () => {
  let component: ReservasRecientesComponent;
  let fixture: ComponentFixture<ReservasRecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasRecientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
