import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasTuristaComponent } from './resenas-turista.component';

describe('ResenasTuristaComponent', () => {
  let component: ResenasTuristaComponent;
  let fixture: ComponentFixture<ResenasTuristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResenasTuristaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenasTuristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
