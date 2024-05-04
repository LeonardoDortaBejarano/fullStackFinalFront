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
  private rodmaps: Roadmap[] = [];
  
  


  RoadmapsComponent(){}

  ngOnInit() {
    console.log('0');
    this.roadmapService.getUserRoadmaps()?.subscribe(data => {
      if (data && data.length > 0) {
        this.rodmaps = data.map(item => new Roadmap(item.id, item.name, item.description));
        console.log('Roadmaps:', this.rodmaps);
      }
    });
    /* rodmaps =  */
  }





  createRoadmap(f: NgForm) {
    /* console.log(this.rodmaps[0].getName()); */
    alert(`${f.value.title} ${f.value.description} `)
    let newRoadmap:Roadmap | null = this.roadmapService.creteRoadmap(f.value.title,f.value.description);
    if (newRoadmap != null) {
      this.rodmaps.push(newRoadmap);
    }
    
  }

  getRoadmapsLenght(): number {
    return this.rodmaps.length;
  }

  getRoadmaps(): Roadmap[] {
    return this.rodmaps;
  }

}
