import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';  // Adjust the path as necessary

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = true; // Initialize as true for password to be hidden
  email!: string;
  password!: string;
  isLoading: boolean = false; // Loader visibility flag

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.toastr.error('Please enter both email and password.', 'Error');
      return;
    }

    this.isLoading = true; // Show loader

    this.apiService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log(response);
        
        localStorage.setItem('token', response.result.token);
        this.toastr.success('Login successful!', 'Success');
        this.router.navigate(['/leads']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.toastr.error('Login failed. Please check your credentials and try again.', 'Error');
      },
      complete: () => {
        this.isLoading = false; // Hide loader
      }
    });
  }
}
