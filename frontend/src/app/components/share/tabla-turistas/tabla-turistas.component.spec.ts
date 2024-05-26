import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTuristasComponent } from './tabla-turistas.component';

describe('TablaTuristasComponent', () => {
  let component: TablaTuristasComponent;
  let fixture: ComponentFixture<TablaTuristasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTuristasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaTuristasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
