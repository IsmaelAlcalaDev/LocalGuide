import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGuiaComponent } from './info-guia.component';

describe('InfoGuiaComponent', () => {
  let component: InfoGuiaComponent;
  let fixture: ComponentFixture<InfoGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoGuiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
