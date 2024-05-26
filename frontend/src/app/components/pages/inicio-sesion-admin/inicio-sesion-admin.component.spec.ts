import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSesionAdminComponent } from './inicio-sesion-admin.component';

describe('InicioSesionAdminComponent', () => {
  let component: InicioSesionAdminComponent;
  let fixture: ComponentFixture<InicioSesionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioSesionAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioSesionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
