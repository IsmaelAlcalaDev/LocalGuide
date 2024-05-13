import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoAumentoVisibilidadComponent } from './pago-aumento-visibilidad.component';

describe('PagoAumentoVisibilidadComponent', () => {
  let component: PagoAumentoVisibilidadComponent;
  let fixture: ComponentFixture<PagoAumentoVisibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoAumentoVisibilidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoAumentoVisibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
