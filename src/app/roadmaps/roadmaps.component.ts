import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RoadmapService } from '../services/roadmap/roadmap.service';
import { Roadmap } from '../models/Roadmap';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-roadmaps',
  standalone: true,
  imports: [FormsModule,MatGridListModule],
  templateUrl: './roadmaps.component.html',
  styleUrl: './roadmaps.component.css'
})
export class RoadmapsComponent {
  private roadmapService: RoadmapService = inject(RoadmapService)
  rodmaps: Roadmap[] = [];
  
  


  RoadmapsComponent(){}

  ngOnInit() {
    console.log('0');
    this.roadmapService.getUserRoadmaps()?.subscribe(data => {
      if (data && data.length > 0) {
        this.rodmaps = data.map(item => new Roadmap(item.id, item.name, item.description, item.milestone));
        console.log('Roadmaps:', this.rodmaps);
      }
    });
    /* rodmaps =  */
  }





  async createRoadmap(f: NgForm) {

    let newRoadmap:Observable<Roadmap> | null = await this.roadmapService.creteRoadmap(f.value.title,f.value.description);
    if (newRoadmap != null) {


      newRoadmap.subscribe((data: any) => {
        console.log(data);
        this.rodmaps.push(new Roadmap(data.id, data.name, data.description,data.milestone))
       })
    } 
      console.log(this.rodmaps);
    }
    
  

  getRoadmapsLenght(): number {
    return this.rodmaps.length;
  }

  getRoadmaps(): Roadmap[] {
    return this.rodmaps;
  }

}
