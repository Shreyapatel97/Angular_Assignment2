import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.authService.setLoggedIn(true);
      this.router.navigate(['job-list']);
    } else {
      console.log('please enter details');
    }
  }
}
