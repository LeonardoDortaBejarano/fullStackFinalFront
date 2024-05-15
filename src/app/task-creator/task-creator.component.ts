import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-creator',
  standalone: true,
  imports: [FormsModule,CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './task-creator.component.html',
  styleUrl: './task-creator.component.css'
})
export class TaskCreatorComponent {

  taskList: String [] = [];
  taskToAdd: String = "";

  constructor(){}
 
  @Output() taskAddedToList= new EventEmitter<String>();
  @Output() taskOrdersHaveChanged = new EventEmitter<Map<string,number>>();
  

  addTaskToTaskList(): void{
    this.taskList.push(this.taskToAdd);
    this.taskAddedToList.emit(this.taskToAdd);
    this.taskToAdd = "";
    
  }

  cleanTaskList() { //call it from the parent
    this.taskList = [];
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
    let map: Map<string,number> = new Map<string,number>() ;
    map.set("previousIndex", event.previousIndex);
    map.set("currentIndex", event.currentIndex)
    this.taskOrdersHaveChanged.emit(map)
  }
  
  

}
