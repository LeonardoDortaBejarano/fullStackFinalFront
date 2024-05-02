import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Roadmap } from '../../models/Roadmap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  
  

  constructor() { }

  creteRoadmap(name: String, description: String) {
    let userId:number | null = this.authService.getUserId();
    if (userId) {
      this.httpClient.post(`http://localhost:8080/api/v1/user/${userId}/roadmap`,{name : name , description: description }).subscribe(data => {
        console.log(data);
    });
    }
  }

  getUserRoadmaps() : Observable<Roadmap[]> | null {
    let userId:number | null = this.authService.getUserId();
    if (userId) {
        return this.httpClient.get<Roadmap[]>(`http://localhost:8080/api/v1/user/${userId}/roadmap`);
    } else {
      return null
    }
  }

}
 