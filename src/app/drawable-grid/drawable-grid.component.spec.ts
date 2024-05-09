import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawableGridComponent } from './drawable-grid.component';

describe('DrawableGridComponent', () => {
  let component: DrawableGridComponent;
  let fixture: ComponentFixture<DrawableGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawableGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
