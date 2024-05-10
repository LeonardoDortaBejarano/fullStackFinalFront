import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndDeleteMenuComponent } from './edit-and-delete-menu.component';

describe('EditAndDeleteMenuComponent', () => {
  let component: EditAndDeleteMenuComponent;
  let fixture: ComponentFixture<EditAndDeleteMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAndDeleteMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAndDeleteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
