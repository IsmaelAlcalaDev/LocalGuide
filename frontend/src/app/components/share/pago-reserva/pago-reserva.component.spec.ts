import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoReservaComponent } from './pago-reserva.component';

describe('PagoReservaComponent', () => {
  let component: PagoReservaComponent;
  let fixture: ComponentFixture<PagoReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
