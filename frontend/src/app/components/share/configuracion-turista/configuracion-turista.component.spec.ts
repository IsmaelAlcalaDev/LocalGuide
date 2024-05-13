import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionTuristaComponent } from './configuracion-turista.component';

describe('ConfiguracionTuristaComponent', () => {
  let component: ConfiguracionTuristaComponent;
  let fixture: ComponentFixture<ConfiguracionTuristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionTuristaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionTuristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
