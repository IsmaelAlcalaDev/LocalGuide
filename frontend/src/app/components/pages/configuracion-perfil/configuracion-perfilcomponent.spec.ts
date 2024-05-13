import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionPerfilComponent } from './configuracion-perfil.component';

describe('ConfiguracionPerfilComponent', () => {
  let component: ConfiguracionPerfilComponent;
  let fixture: ComponentFixture<ConfiguracionPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
