import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roadmap-line',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './roadmap-line.component.html',
  styleUrl: './roadmap-line.component.css'
})
export class RoadmapLineComponent implements OnInit  {

  @Input() id!:string;

  ngOnInit(){
    console.info("id:",this.id);
  }
}
