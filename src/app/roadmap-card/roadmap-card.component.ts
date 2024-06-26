import { Component, EventEmitter,  Input, Output, inject, input } from '@angular/core';
import { Roadmap } from '../models/Roadmap';
import { CommonModule } from '@angular/common';


import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RoadmapService } from '../services/roadmap/roadmap.service';


import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-roadmap-card',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule],
  templateUrl: './roadmap-card.component.html',
  styleUrl: './roadmap-card.component.css'
})
export class RoadmapCardComponent {

  public roadmapService: RoadmapService =  inject(RoadmapService)

 


  @Input() roadmap?: Roadmap;
  @Input() selectedColorId: number = 1;

  @Output() deletedElement = new EventEmitter<Number>();
  @Output() editingRaoadmap= new EventEmitter<Roadmap>();

/*   colorsAvailable: String [] = ["l-bg-cherry","l-bg-blue-dark","l-bg-green-dark","l-bg-orange-dark","l-bg-cyan","l-bg-green","l-bg-orange","l-bg-cyan"]
  showOption: boolean = false; */
  
  
  constructor(){}

  deleteRoadmap() {

    if (this.roadmap != undefined) {
      this.roadmapService.deleteRoadmap(this.roadmap.id).subscribe((data) => {
          this.deletedElement.emit(this.roadmap?.id)
      })
    }

    /* this.clickDelete.emit(true); */
  }

  editRoadmap() {
    this.editingRaoadmap.emit(this.roadmap)
    }






}
