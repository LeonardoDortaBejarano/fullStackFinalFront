import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css' 
})
export class RegisterComponent {

  private authService:AuthService = inject(AuthService);

  public register(f: NgForm){
    this.authService.register(f.value.username, f.value.email, f.value.password);
  }

}
