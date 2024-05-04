import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapLineComponent } from './roadmap-line.component';

describe('RoadmapLineComponent', () => {
  let component: RoadmapLineComponent;
  let fixture: ComponentFixture<RoadmapLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadmapLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoadmapLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
