import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RoadmapService } from '../services/roadmap/roadmap.service';
import { Roadmap } from '../models/Roadmap';
import { OrderPair } from '../models/OrderPair';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import { RoadmapCardComponent } from "../roadmap-card/roadmap-card.component";
import { Task } from '../models/Task';
import { Milestone } from '../models/Milestone';
import { NgxColorsModule } from 'ngx-colors';
import { ActionToPerfomce } from '../enum/roadmap'

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop'

/* import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop'; */

@Component({
    selector: 'app-roadmaps',
    standalone: true,
    templateUrl: './roadmaps.component.html',
    styleUrl: './roadmaps.component.css',
    imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormsModule, MatGridListModule, RoadmapCardComponent, NgxColorsModule]
})
export class RoadmapsComponent {

  private roadmapService: RoadmapService = inject(RoadmapService)
  rodmaps: Roadmap[] = [];
  selectedRoadmap?:Roadmap;
  actionToMake: ActionToPerfomce = ActionToPerfomce.save;
  nameOfTheRoadmap: String = "";
  descriptionOfTheRoadmap: String = "";
  colorOfTheRoadmap: String = "#0e2c5e";
  

  

  RoadmapsComponent(){}

  ngOnInit() {
    this.roadmapService.getUserRoadmaps()?.subscribe((data: Roadmap[]) => {
    

      if (data && data.length > 0) {

         this.rodmaps = data;
         console.log(`this.rodmaps`);
         console.log(this.rodmaps);
      }
    }); 
  }


    executeSaveOrEditAction() {
      this.actionToMake == ActionToPerfomce.save? this.createRoadmap() : this.editRoadmap();
    }

    setRoadmapValuesForSaving() {
        this.actionToMake = ActionToPerfomce.save;
        this.nameOfTheRoadmap = ''
        this.descriptionOfTheRoadmap = ''
        this.colorOfTheRoadmap = "#0e2c5e";
        this.selectedRoadmap = undefined;
      }


    createRoadmap() {
    let newRoadmap:Observable<Roadmap> | null = this.roadmapService.creteRoadmap(this.nameOfTheRoadmap, this.descriptionOfTheRoadmap, this.colorOfTheRoadmap);
    if (newRoadmap != null) {
      newRoadmap.subscribe((data: Roadmap) => {
        this.rodmaps.push(data);
       })
    }
    }

    editRoadmap() {
      let newRoadmap:Observable<Roadmap> | null = this.roadmapService.editRoadmap(this.nameOfTheRoadmap, this.descriptionOfTheRoadmap, this.colorOfTheRoadmap,this.selectedRoadmap?.id);
      if (newRoadmap != null) {
        newRoadmap.subscribe((data: Roadmap) => {
          const index = this.rodmaps.findIndex((r) => r.id === data.id);
          if (index > -1) {
            this.rodmaps[index] = data;
          }
         })
         console.log(this.rodmaps);
      } else {
        alert("No se pudo actualizar el Roadmap")
      }

    }

    setRoadmapValuesForEditing(roadmap: Roadmap) {
      this.actionToMake = ActionToPerfomce.edit;
      this.nameOfTheRoadmap = roadmap.name;
      this.descriptionOfTheRoadmap = roadmap.description;
      this.colorOfTheRoadmap = roadmap.color;
      this.selectedRoadmap = roadmap;

/*         let newRoadmap:Observable<Roadmap> | null = this.roadmapService.editRoadmapColorNameAndDescription(this.nameOfTheRoadmap, this.descriptionOfTheRoadmap, this.colorOfTheRoadmap);
        if (newRoadmap != null) {
          newRoadmap.subscribe((data: Roadmap) => {
            this.rodmaps.push(data);
          })
        } */
      }

  getRoadmapsLenght(): number {
    return this.rodmaps.length;
  }

  getRoadmaps(): Roadmap[] {
    return this.rodmaps;
  }

  deleteRoadmapFromList(roadmapId: Number) {
    const roadmapToEliminate: Roadmap | undefined = this.rodmaps.find((roadmap) => {
      if (roadmap.id == roadmapId) {
        return roadmap;
      } else {
        return null
      }
    })

    if (roadmapToEliminate) {
      const index = this.rodmaps.indexOf(roadmapToEliminate, 0);
      if (index > -1) {
        this.rodmaps.splice(index,1)
      }
    }
   
  }

  updateRoadmapsOrder(){
    let newOrder = this.rodmaps.map((roadmap: Roadmap, index:number) => {
      console.log("adentro")
      return {  "id": roadmap.id ,
        "orderValue": index}
    })
    console.log("CUIDADO")
    console.table(newOrder)
    this.roadmapService.updateRoadmapOrder(newOrder);
  }

  drop(event: CdkDragDrop<Roadmap[]>) {

    const index1 = this.rodmaps.findIndex((r) => r === event.container.data[0]);
    const index2 = this.rodmaps.findIndex((r) => r === event.previousContainer.data[0]);
    if (index1 > -1 && index2 > -1 ) {
     let elementToSplice = this.rodmaps.splice(index2,1)[0];
     this.rodmaps.splice(index1, 0, elementToSplice)[0];
     console.log(this.rodmaps);
     this.updateRoadmapsOrder()
    }
  }



}
