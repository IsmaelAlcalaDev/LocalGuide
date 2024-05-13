import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarGuiasComponent } from './filtrar-guias.component';

describe('FiltrarGuiasComponent', () => {
  let component: FiltrarGuiasComponent;
  let fixture: ComponentFixture<FiltrarGuiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltrarGuiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrarGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
