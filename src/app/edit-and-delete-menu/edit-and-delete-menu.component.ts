import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Roadmap } from '../models/Roadmap';
import { Milestone } from '../models/Milestone';
import { Task } from '../models/Task';

@Component({
  selector: 'app-edit-and-delete-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './edit-and-delete-menu.component.html',
  styleUrl: './edit-and-delete-menu.component.css'
})
export class EditAndDeleteMenuComponent {

  @Input() objectToEditOrDelete?: Roadmap | Milestone | Task;

  @Output() deleteEvent:EventEmitter<boolean> = new EventEmitter<boolean>
  @Output() editEvent:EventEmitter<boolean> = new EventEmitter<boolean>



editAction() {
  this.editEvent.emit();
}
deleteAction() {
  this.deleteEvent.emit();
}

}
