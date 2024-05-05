import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskCreatorComponent } from "../task-creator/task-creator.component";

@Component({
    selector: 'app-roadmap-line',
    standalone: true,
    templateUrl: './roadmap-line.component.html',
    styleUrl: './roadmap-line.component.css',
    imports: [FormsModule, TaskCreatorComponent]
})
export class RoadmapLineComponent implements OnInit  {

  @Input() id!:string;
  tasksList: String [] = [];

  ngOnInit(){
    console.info("id:",this.id);
  }

  updateTaskList(taskListFromChild: String[]): void {
    this.tasksList = taskListFromChild;
  }


}
