import { Component, Input, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskCreatorComponent } from "../task-creator/task-creator.component";
import { RoadmapService } from '../services/roadmap/roadmap.service';
import { Task } from '../models/Task';
import { Roadmap } from '../models/Roadmap';
import { Milestone } from '../models/Milestone';
import { EditAndDeleteMenuComponent } from "../edit-and-delete-menu/edit-and-delete-menu.component";

@Component({
    selector: 'app-roadmap-line',
    standalone: true,
    templateUrl: './roadmap-line.component.html',
    styleUrl: './roadmap-line.component.css',
    imports: [FormsModule, TaskCreatorComponent, EditAndDeleteMenuComponent]
})
export class RoadmapLineComponent implements OnInit  {
/* }) */
editMilestone(milestone: Milestone) {
  alert(`editMilestone ${milestone.name}`)
}
deleteMilestone(milestone: Milestone) {
  alert(`deleteMilestone ${milestone.name}`)
}

  roadmapService: RoadmapService = inject(RoadmapService); 

  @Input() id!:string;
  @ViewChild(TaskCreatorComponent) taskCreator:TaskCreatorComponent | undefined ;

  tasksList: Task [] = [];
  roadmap?: Roadmap | null = null;
  selectedMilestone: Milestone | undefined = undefined;

  ngOnInit(){
    console.info("id:",this.id);
    let milestoneTask: Task[] = []
    let milestoneToInsert : Milestone[] = [];

/*     this.roadmapService.getUserRoadmap(+this.id).subscribe((data: any) => {
      data.milestones.forEach((milestone:any) => {
        milestoneTask = milestone.tasks.map((task:any) =>new Task(task.name,task.id,task.complete) )
        milestoneToInsert.push(new Milestone(milestone.name,milestone.content,milestoneTask))
      }); */

          this.roadmapService.getUserRoadmap(+this.id).subscribe((data: Roadmap) => {
            this.roadmap=data;
      });

      
       
      /* this.roadmap = new Roadmap(data.id,data.name,data.description,milestoneToInsert); */

    /* }) */
  }

  updateTaskList(taskFromChild: String): void {
    let task: Task;

      task = {
        name : taskFromChild,
        complete : false,
        link : "",
        orderValue : "0",
      }
      this.tasksList.push(task);
    /* this.tasksList = taskListFromChild.map(task => {name:} as Task); */
  }

  saveChanges(f: NgForm) {
    this.roadmapService.createMilestone(f.value.title, f.value.description,this.tasksList,+this.id)?.subscribe((data: Milestone) => {
      if (data) {
        let newMilestone = data;
        this.roadmap?.milestones.push(newMilestone);
        this.taskCreator?.cleanTaskList();
        this.tasksList = [];
      }});
  }

  getRoadmapMilestone() : Milestone[] | undefined{
    return this.roadmap?.milestones;
  }

  setSelectedMilestone(selectedMilestone: Milestone):void {
    this.selectedMilestone =  selectedMilestone; 
    console.log('selectedMilestone');
    console.log(selectedMilestone);
     
    }

  changeTaskState(newState: boolean,task:Task) {
    task.complete = newState;
    this.roadmapService.updateTask(task);
  }   
  


}
