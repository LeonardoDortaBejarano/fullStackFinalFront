import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
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

  constructor(){}
 
  @Output() taskAddedToList= new EventEmitter<String>();
  

  addTaskToTaskList(): void{
    this.taskList.push(this.taskToAdd);
    this.taskAddedToList.emit(this.taskToAdd);
    this.taskToAdd = "";
    
  }

  cleanTaskList() { //call it from the parent
    this.taskList = [];
  }

  

}
