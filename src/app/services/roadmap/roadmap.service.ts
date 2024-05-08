import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Roadmap } from '../../models/Roadmap';
import { Milestone } from '../../models/Milestone';
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {



  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  
  

  constructor() { }

  creteRoadmap(name: String, description: String): Observable<Roadmap> |null{
    let userId:number | null = this.authService.getUserId();
    
    if (userId) {
     return this.httpClient.post<Roadmap>(`http://localhost:8080/api/v1/user/${userId}/roadmap`,{name : name , description: description })
    }
    return null;
  }



  getUserRoadmaps() : Observable<Roadmap[]> | null {
    let userId:number | null = this.authService.getUserId();
    if (userId) {
        return this.httpClient.get<Roadmap[]>(`http://localhost:8080/api/v1/user/${userId}/roadmap`);
    } else {
      return null
    }
  }

  getUserRoadmap(roadmapId: number) : Observable<Roadmap> {
        return this.httpClient.get<Roadmap>(`http://localhost:8080/api/v1/roadmap/${roadmapId}`);

  }

  createMilestone(name: String, description: String, tasks: Task[], roadmapId: number):Observable<Milestone> | null {
    let milestone: Milestone = {name: name,content:description, tasks: tasks}
    let userId:number | null = this.authService.getUserId();
    if (userId) {
      return this.httpClient.post<Milestone>(`http://localhost:8080/api/v1/roadmap/${roadmapId}/milestone`,milestone)
    } 
      return null
  }

  updateTask(task:Task) {

    this.httpClient.put<Task>(`http://localhost:8080/api/v1/task/${task.id}`,task).subscribe((data) => {
      
     
    })
  }

  searchRoadmapsByQuery(query: String): Observable<Roadmap[]> {
/*     const params = new HttpParams({fromString: `query=${query}`});
    return this.httpClient.request<Roadmap[]>('GET', `http://localhost:8080/api/v1/roadmap/search}`, {responseType:'json', params}); */
    return this.httpClient.get<Roadmap[]>(`http://localhost:8080/api/v1/roadmap/search?query=${query}`);
  }

  deleteRoadmap(roadmapId: Number):Observable<any>{
    return this.httpClient.delete(`http://localhost:8080/api/v1/roadmap/${roadmapId}`);
  }

}
 