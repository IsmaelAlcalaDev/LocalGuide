import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenReservasComponent } from './resumen-reservas.component';

describe('ResumenReservasComponent', () => {
  let component: ResumenReservasComponent;
  let fixture: ComponentFixture<ResumenReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumenReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
