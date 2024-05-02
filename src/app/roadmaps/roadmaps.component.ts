import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RoadmapService } from '../services/roadmap/roadmap.service';
import { Roadmap } from '../models/Roadmap';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'app-roadmaps',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './roadmaps.component.html',
  styleUrl: './roadmaps.component.css'
})
export class RoadmapsComponent implements OnInit{
  private roadmapService: RoadmapService = inject(RoadmapService)
  private rodmaps: Roadmap[] = [];
  
  


  RoadmapsComponent(){}

  ngOnInit() {

    
    this.roadmapService.getUserRoadmaps()?.pipe(
      map((data: any[]) => {
        this.rodmaps = data.map(item => new Roadmap(item.id, item.name, item.description));
        
        console.log("data");
      } ))
    /* rodmaps =  */
  }





  createRoadmap(f: NgForm) {
    console.log(this.rodmaps[0].getName());
    alert(`${f.value.title} ${f.value.description} `)
    this.roadmapService.creteRoadmap(f.value.title,f.value.description)
  }

}
