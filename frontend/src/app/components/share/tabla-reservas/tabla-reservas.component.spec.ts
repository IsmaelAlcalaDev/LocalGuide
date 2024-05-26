import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReservasComponent } from './tabla-reservas.component';

describe('TablaReservasComponent', () => {
  let component: TablaReservasComponent;
  let fixture: ComponentFixture<TablaReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
