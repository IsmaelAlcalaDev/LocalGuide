import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarGuiasComponent } from './buscar-guias.component';

describe('BuscarGuiasComponent', () => {
  let component: BuscarGuiasComponent;
  let fixture: ComponentFixture<BuscarGuiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarGuiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
