import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasAntiguasTuristaComponent } from './reservas-antiguas-turista.component';

describe('ReservasAntiguasTuristaComponent', () => {
  let component: ReservasAntiguasTuristaComponent;
  let fixture: ComponentFixture<ReservasAntiguasTuristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasAntiguasTuristaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasAntiguasTuristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
