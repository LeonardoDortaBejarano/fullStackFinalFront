import { Component, Input, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskCreatorComponent } from "../task-creator/task-creator.component";
import { RoadmapService } from '../services/roadmap/roadmap.service';
import { Task } from '../models/Task';
import { Roadmap } from '../models/Roadmap';
import { Milestone } from '../models/Milestone';

@Component({
    selector: 'app-roadmap-line',
    standalone: true,
    templateUrl: './roadmap-line.component.html',
    styleUrl: './roadmap-line.component.css',
    imports: [FormsModule, TaskCreatorComponent]
})
export class RoadmapLineComponent implements OnInit  {

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

    this.roadmapService.getUserRoadmap(+this.id).subscribe((data: any) => {
      data.milestones.forEach((milestone:any) => {
        milestoneTask = milestone.tasks.map((task:any) =>new Task(task.name,task.id,task.complete) )
        milestoneToInsert.push(new Milestone(milestone.name,milestone.content,milestoneTask))
      });
      console.log(data);
      this.roadmap = new Roadmap(data.id,data.name,data.description,milestoneToInsert);

    })
  }

  updateTaskList(taskListFromChild: String[]): void {
    this.tasksList = taskListFromChild.map(task => new Task(task));
  }

  saveChanges(f: NgForm) {
    this.roadmapService.createMilestone(f.value.title, f.value.description,this.tasksList,+this.id)?.subscribe((data: any) => {
      if (data) {
        let newMilestone = new Milestone(data.name,data.content,this.tasksList);
        debugger;
        this.roadmap?.addMilestone(newMilestone);
        this.taskCreator?.cleanTaskList();
      }});
  }

  getRoadmapMilestone() : Milestone[] | undefined{
    return this.roadmap?.getMilestone();
  }

  setSelectedMilestone(selectedMilestone: Milestone):void {
    this.selectedMilestone =  selectedMilestone; 
    console.log(this.selectedMilestone);
    }

  changeTaskState(newState: boolean,task:Task) {
   
    task.setCompleted(newState);
    this.roadmapService.updateTask(task);
  }   
  


}
