import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTuristaComponent } from './info-turista.component';

describe('InfoTuristaComponent', () => {
  let component: InfoTuristaComponent;
  let fixture: ComponentFixture<InfoTuristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoTuristaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoTuristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
