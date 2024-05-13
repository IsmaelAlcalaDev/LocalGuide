import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionGuiaComponent } from './configuracion-guia.component';

describe('ConfiguracionGuiaComponent', () => {
  let component: ConfiguracionGuiaComponent;
  let fixture: ComponentFixture<ConfiguracionGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionGuiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
