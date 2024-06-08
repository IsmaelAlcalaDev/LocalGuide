import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasGuiasFiltradosComponent } from './tarjetas-guias-filtrados.component';

describe('TarjetasGuiasFiltradosComponent', () => {
  let component: TarjetasGuiasFiltradosComponent;
  let fixture: ComponentFixture<TarjetasGuiasFiltradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetasGuiasFiltradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetasGuiasFiltradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
