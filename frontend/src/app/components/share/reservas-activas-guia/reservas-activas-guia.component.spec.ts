import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasActivasGuiaComponent } from './reservas-activas-guia.component';

describe('ReservasActivasGuiaComponent', () => {
  let component: ReservasActivasGuiaComponent;
  let fixture: ComponentFixture<ReservasActivasGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasActivasGuiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasActivasGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
