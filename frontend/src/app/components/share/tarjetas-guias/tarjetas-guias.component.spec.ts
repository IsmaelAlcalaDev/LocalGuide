import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasGuiasComponent } from './tarjetas-guias.component';

describe('TarjetasGuiasComponent', () => {
  let component: TarjetasGuiasComponent;
  let fixture: ComponentFixture<TarjetasGuiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetasGuiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetasGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
