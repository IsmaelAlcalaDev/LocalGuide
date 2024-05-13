import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAdicionalGuiaComponent } from './informacion-adicional-guia.component';

describe('InformacionAdicionalGuiaComponent', () => {
  let component: InformacionAdicionalGuiaComponent;
  let fixture: ComponentFixture<InformacionAdicionalGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionAdicionalGuiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionAdicionalGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
