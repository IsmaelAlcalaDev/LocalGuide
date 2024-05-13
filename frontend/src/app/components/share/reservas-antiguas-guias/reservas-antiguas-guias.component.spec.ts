import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasAntiguasGuiasComponent } from './reservas-antiguas-guias.component';

describe('ReservasAntiguasGuiasComponent', () => {
  let component: ReservasAntiguasGuiasComponent;
  let fixture: ComponentFixture<ReservasAntiguasGuiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasAntiguasGuiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasAntiguasGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
