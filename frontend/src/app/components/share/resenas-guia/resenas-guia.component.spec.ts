import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasGuiaComponent } from './resenas-guia.component';

describe('ResenasGuiaComponent', () => {
  let component: ResenasGuiaComponent;
  let fixture: ComponentFixture<ResenasGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResenasGuiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenasGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
