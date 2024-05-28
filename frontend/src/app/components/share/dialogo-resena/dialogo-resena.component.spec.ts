import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoResenaComponent } from './dialogo-resena.component';

describe('DialogoResenaComponent', () => {
  let component: DialogoResenaComponent;
  let fixture: ComponentFixture<DialogoResenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoResenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
