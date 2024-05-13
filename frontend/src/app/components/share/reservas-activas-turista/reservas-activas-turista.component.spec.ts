import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasActivasTuristaComponent } from './reservas-activas-turista.component';

describe('ReservasActivasTuristaComponent', () => {
  let component: ReservasActivasTuristaComponent;
  let fixture: ComponentFixture<ReservasActivasTuristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasActivasTuristaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasActivasTuristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
