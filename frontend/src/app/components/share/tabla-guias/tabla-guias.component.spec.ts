import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGuiasComponent } from './tabla-guias.component';

describe('TablaGuiasComponent', () => {
  let component: TablaGuiasComponent;
  let fixture: ComponentFixture<TablaGuiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaGuiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
