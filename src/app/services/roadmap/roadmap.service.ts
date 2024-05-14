import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Roadmap } from '../../models/Roadmap';
import { Milestone } from '../../models/Milestone';
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';
import { __param } from 'tslib';
import { OrderPair } from '../../models/OrderPair';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {



  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  
  

  constructor() { }

  creteRoadmap(name: String, description: String, color: String): Observable<Roadmap> |null{
    let userId:number | null = this.authService.getUserId();
    
    if (userId) {
     return this.httpClient.post<Roadmap>(`http://localhost:8080/api/v1/user/${userId}/roadmap`,{name : name , description: description, color:color })
    }
    return null;
  }

  editMileston(milestone: Milestone): Observable<Milestone>|null {
    if (milestone.id != undefined) {
      return this.httpClient.put<Milestone>(`http://localhost:8080/api/v1/milestone/${milestone.id}`,milestone)
    }
    return null;
  }

  deleteMilestone(milestoneId: Number) : Observable<any>{
    return this.httpClient.delete<Milestone>(`http://localhost:8080/api/v1/milestone/${milestoneId}`)
  }




  editRoadmap(nameOfTheRoadmap: String, descriptionOfTheRoadmap: String, colorOfTheRoadmap: String, roadmapId: Number|undefined): Observable<Roadmap> | null {
    if (roadmapId != undefined) {
      return this.httpClient.patch<Roadmap>(`http://localhost:8080/api/v1/roadmap/${roadmapId}`,{name : nameOfTheRoadmap , description: descriptionOfTheRoadmap, color:colorOfTheRoadmap })
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

  createMilestone(name: String, description: String, tasks: Task[], roadmapId: number, milestoneOrderValues: Number):Observable<Milestone> | null {
    let milestone: Milestone = {name: name,content:description, tasks: tasks, orderValue: milestoneOrderValues}
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

  updateRoadmapOrder(orderPairs:OrderPair[]) {
    console.log("orderPairs");
    console.log(orderPairs);
    this.httpClient.put<Task>(`http://localhost:8080/api/v1/milestone/order`,orderPairs).subscribe((data) => {
      console.log("has happend")
    })
  }

  updateMilestonOrder(orderPairs:OrderPair) { 
    this.httpClient.put(`http://localhost:8080/api/v1/roadmap/order`,orderPairs).subscribe((data) => {
      console.log("has happend")
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
 