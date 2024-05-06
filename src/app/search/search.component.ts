import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Roadmap } from '../models/Roadmap';
import { RoadmapService } from '../services/roadmap/roadmap.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  public query: string = "";
  public roadmaps: Roadmap[] = [];
  public roadmapService = inject(RoadmapService)

  search(){
    console.log(this.query)
    this.roadmapService.searchRoadmapsByQuery(this.query).subscribe((data: any) => {
      if (data) {
        console.log(data)
        this.roadmaps = data.map((data:any) => new Roadmap(data.id, data.name,data.description,[]));
      }
    })
  }
}
