import { Injectable, inject } from "@angular/core";

import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";

import { jwtDecode } from "jwt-decode";
import { AuthResponse } from "../../models/AuthResponse";
import { Router } from "@angular/router";
import { TokenIdDecode } from "../../models/TokenIdDecode";


@Injectable( {providedIn : "root"})

export class AuthService {
  private router:Router = inject(Router);

     private token:string = ""

     constructor(private httpClient: HttpClient/* ,private cookieService: CookieService */){

     }

     public getToken():string | null{
      return sessionStorage.getItem("token");
     }

     public  getUserId():number | null {
      const decodeToken:TokenIdDecode = jwtDecode(this.getToken()!);
      if (decodeToken["id"]) {
        console.log(decodeToken["id"])
        return decodeToken["id"]
      }
      return null
     }

     isLogged():boolean {
        if (this.getToken() != null) {
          return true
        }
        return false;
      }

    isTokenValid():boolean {
    
      if (this.getToken() != null) {
        const decodeToken = jwtDecode(this.getToken()!);
        if (decodeToken.exp! < new Date().getTime() ) {
          return true;
        } 
      }
      return false;
    }
    
    
    

    logout(): void {
      sessionStorage.removeItem("token");
    }


     public register(username: string, password: string, email: string):void {
      console.log(`username ${username}   password ${password}  email ${email}`)
       this.httpClient.post<AuthResponse>("http://localhost:8080/api/v1/auth/register",{username : username , email: email , password: password }).subscribe(data => {
         this.token = data.token;
         sessionStorage.setItem("token",this.token);
     });
    }

    public login(username: string, password: string):void {
      console.log(`username ${username}   password ${password}`)

       this.httpClient.post<AuthResponse>("http://localhost:8080/api/v1/auth/login",{username : username ,password: password }).subscribe((data) => {
         this.token = data.token;
         sessionStorage.setItem("token",this.token);
         this.router.navigate(['/roadmaps']);
     });
    }

}