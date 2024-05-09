import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RoadmapService } from '../services/roadmap/roadmap.service';
import { Roadmap } from '../models/Roadmap';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import { RoadmapCardComponent } from "../roadmap-card/roadmap-card.component";
import { Task } from '../models/Task';
import { Milestone } from '../models/Milestone';



@Component({
    selector: 'app-roadmaps',
    standalone: true,
    templateUrl: './roadmaps.component.html',
    styleUrl: './roadmaps.component.css',
    imports: [FormsModule, MatGridListModule, RoadmapCardComponent]
})
export class RoadmapsComponent {
  private roadmapService: RoadmapService = inject(RoadmapService)
  rodmaps: Roadmap[] = [];
  

  RoadmapsComponent(){}

  ngOnInit() {
    this.roadmapService.getUserRoadmaps()?.subscribe((data: Roadmap[]) => {
    
      let milestoneTasks: Task[];
      let milestoneToInsert: Milestone[];
      let roadmap:Roadmap;

      if (data && data.length > 0) {

         this.rodmaps = data;
         console.log(`this.rodmaps`);
         console.log(this.rodmaps);
      }
    }); 
  }





   async createRoadmap(f: NgForm) {

    let newRoadmap:Observable<Roadmap> | null = await this.roadmapService.creteRoadmap(f.value.title,f.value.description);
    if (newRoadmap != null) {
      newRoadmap.subscribe((data: Roadmap) => {
        this.rodmaps.push(data);
       })
    }
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

}
