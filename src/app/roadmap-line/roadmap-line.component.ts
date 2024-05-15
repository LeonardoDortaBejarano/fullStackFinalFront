import { Component, Input, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskCreatorComponent } from "../task-creator/task-creator.component";
import { RoadmapService } from '../services/roadmap/roadmap.service';
import { Task } from '../models/Task';
import { Roadmap } from '../models/Roadmap';
import { Milestone } from '../models/Milestone';
import { EditAndDeleteMenuComponent } from "../edit-and-delete-menu/edit-and-delete-menu.component";
import { Observable } from 'rxjs';
import { ActionToPerfomce } from '../enum/roadmap';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragHandle} from '@angular/cdk/drag-drop';
import { OrderPair } from '../models/OrderPair';


@Component({
    selector: 'app-roadmap-line',
    standalone: true, 
    templateUrl: './roadmap-line.component.html',
    styleUrl: './roadmap-line.component.css',
    imports: [FormsModule, TaskCreatorComponent, EditAndDeleteMenuComponent, CdkDropList, CdkDrag, CdkDragHandle]
})
export class RoadmapLineComponent implements OnInit  {


  roadmapService: RoadmapService = inject(RoadmapService); 

  @Input() id!:string;
  @ViewChild(TaskCreatorComponent) taskCreator:TaskCreatorComponent | undefined ;

  /* tasksList: Task [] = []; */
  roadmap?: Roadmap | null = null;
  selectedMilestone: Milestone = {name:"",content:"", tasks: []}
  actionToPerfomce: ActionToPerfomce = ActionToPerfomce.save; 

  ngOnInit(){
    console.info("id:",this.id);

    this.roadmapService.getUserRoadmap(+this.id).subscribe((data: Roadmap) => {
      this.roadmap = data;
      this.roadmap.milestones.sort((n1:Milestone,n2:Milestone) => {
        const orderOne: number = n1.orderValue as number ?? 0;
        const orderTwo: number = n2.orderValue as number ?? 0;
        return orderOne - orderTwo
      });
      this.roadmap.milestones.forEach((milestone: Milestone) => {
        milestone.tasks?.sort((t1: Task,t2:Task) => {return <number>t1.orderValue - <number>t2.orderValue})
      })
      console.log("task")
      console.info(this.roadmap?.milestones[0].tasks);
    });

  }

  performAction() {
    this.actionToPerfomce == ActionToPerfomce.save? this.saveChanges() :  this.editMilestone();
  }

  drop(event: CdkDragDrop<Milestone[]>) {
    moveItemInArray(this.getRoadmapMilestone()!, event.previousIndex, event.currentIndex);
    this.updateMilestonesOrder()
  }
    
    
    deleteMilestone(milestone: Milestone) {
      this.roadmapService.deleteMilestone(milestone.id!).subscribe(data => {
        const index = this.roadmap!.milestones.indexOf(milestone, 0);
        if (index > -1) {
          this.roadmap?.milestones.splice(index,1)
        }
      })
    }

  editMilestone() {
    /*  alert(milestone.id) */
    this.selectedMilestone.roadmapId = this.roadmap?.id;
    /* this.selectedMilestone.tasks = this.tasksList; */
     let milestoneResponse: Observable<Milestone>|null = this.roadmapService.editMileston(this.selectedMilestone);
     if (milestoneResponse == null) {
       alert ('ha ocurrido un error')
     } else {
       milestoneResponse.subscribe((data:Milestone) => {
         const index = this.roadmap!.milestones.findIndex((r) => r.id === data.id);
         if (index > -1 && index != undefined) {
           this.roadmap!.milestones[index] = data;
           this.selectedMilestone = data;
         }
       })
     }
   }

   updateMilestonesOrder(){
    let newOrder = this.roadmap?.milestones.map((milestone: Milestone, index:number) => {
      return {  "id": milestone.id ,
        "orderValue": index}
    })
    console.log("CUIDADO")
    console.table(newOrder)
    this.roadmapService.updateRoadmapOrder(newOrder as OrderPair[]);
  }

  setEditionValues(milestone: Milestone) {
    this.actionToPerfomce = ActionToPerfomce.edit;
    this.selectedMilestone = milestone;
    /* this.tasksList = this.selectedMilestone.tasks!; */
    this.taskCreator!.taskList = this.selectedMilestone.tasks? this.selectedMilestone.tasks.map((task)=> task.name) : [];

   }
   setCreationValues() {
    this.actionToPerfomce = ActionToPerfomce.save;
    this.selectedMilestone = {name:"",content:"", tasks: []};
    this.taskCreator?.cleanTaskList();
    /* this.tasksList = this.selectedMilestone.tasks!; */
   }

   updateTaskList(taskFromChild: String): void {
    let task: Task;

      task = {
        name : taskFromChild,
        complete : false,
        link : "",
        orderValue : <Number>this.selectedMilestone.tasks?.length ?? 0,
      }
      if (this.selectedMilestone) {
        this.selectedMilestone!.tasks?.push(task);
        console.log(this.selectedMilestone.tasks);
      } else {
        console.log('ther is no selected milestone')
      }
    /* this.tasksList = taskListFromChild.map(task => {name:} as Task); */

  }

  saveChanges() {
    this.roadmapService.createMilestone(this.selectedMilestone.name, this.selectedMilestone.content,this.selectedMilestone.tasks ?? [],+this.id,this.roadmap!.milestones.length)?.subscribe((data: Milestone) => {
      if (data) {
        let newMilestone = data;
        this.roadmap?.milestones.push(newMilestone);
        this.taskCreator?.cleanTaskList();
      }});
  }

  

  getRoadmapMilestone() : Milestone[] | undefined{
    return this.roadmap?.milestones;
  }

  setSelectedMilestone(selectedMilestone: Milestone):void {
    this.selectedMilestone =  selectedMilestone;      
    }

  changeTaskState(newState: boolean,task:Task) {
    task.complete = newState;
    this.roadmapService.updateTask(task);
  }   

  
  reorderTaskList(map:Map<string,number>) {
    if (this.selectedMilestone.tasks){
        this.selectedMilestone.tasks[map.get("previousIndex")!].orderValue = map.get("currentIndex")!
        this.selectedMilestone.tasks[map.get("currentIndex")!].orderValue = map.get("previousIndex")!
        moveItemInArray(this.selectedMilestone.tasks, map.get("previousIndex")!,map.get("currentIndex")!);
      }
    
  }
}
