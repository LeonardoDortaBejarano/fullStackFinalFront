import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Roadmap } from '../models/Roadmap';
import { RoadmapService } from '../services/roadmap/roadmap.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,MatDividerModule,MatListModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  public query: string = "";
  public roadmaps: Roadmap[] = [];
  public roadmapService = inject(RoadmapService)

  search(){
     
    this.roadmapService.searchRoadmapsByQuery(this.query).subscribe((data: Roadmap[]) => {
      if (data) {
        this.roadmaps = data;
      }
    })
  }
}
