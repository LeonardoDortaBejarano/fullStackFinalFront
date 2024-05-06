import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guard/auth-guard.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { RoadmapsComponent } from './roadmaps/roadmaps.component';
import { RoadmapLineComponent } from './roadmap-line/roadmap-line.component';
import { SearchComponent } from './search/search.component';


export const routes: Routes = [
    {path : "login", component : LoginComponent},
    {path : "register", component : RegisterComponent},
    {path : "resources", component : NavbarComponent, canActivate: [authGuard]},
    {path : "roadmaps", component : RoadmapsComponent, canActivate: [authGuard]},
    {path : "roadmap/:id", component : RoadmapLineComponent, canActivate: [authGuard]},
    {path : "search", component : SearchComponent, canActivate: [authGuard]},
];
