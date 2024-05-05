import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-creator.component.html',
  styleUrl: './task-creator.component.css'
})
export class TaskCreatorComponent {

  taskList: String [] = [];
  taskToAdd: String = "";

  @Output() taskAddedToList= new EventEmitter<String[]>();

  addTaskToTaskList(): void{
    alert(this.taskToAdd);
    this.taskList.push(this.taskToAdd);
    this.taskAddedToList.emit(this.taskList);
    this.taskToAdd = "";
    
  }

  

}
