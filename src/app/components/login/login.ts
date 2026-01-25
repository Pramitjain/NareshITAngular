import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Import Router
import { NgModule } from '@angular/core'; // Add NgModule import
import { HttpClient, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private httpCall: HttpClient) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private baseUrl =
    'https://documentupload-bmdpgcethje9c3bn.centralus-01.azurewebsites.net/api/auth/login';

  onSubmit() {
    if (this.loginForm.valid) {
      const queryParams = new HttpParams()
        .set('UserName', this.loginForm.value.userName)
        .set('Password', this.loginForm.value.password);

      // Call the API
      this.httpCall.post<any>(this.baseUrl, null, { params: queryParams }).subscribe({
        next: (response) => {
          console.log('Login response:', response);
          // 1. Get the token from the response (assuming key is 'token' or 'accessToken')
          const token = response.token;

          if (token) {
            // 2. Store it in LocalStorage so the app remembers you
            localStorage.setItem('bearerToken', token);

            console.log('Login Successful, Token saved!');

            const decoded: any = jwtDecode(token);
            console.log('Decoded JWT:', decoded);
            const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
const fullName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

console.log(`Name: ${fullName}, Email: ${email}, UserId: ${userId}`); // Output: john@example.com
console.log(fullName);
            //console.log('User ID:', decoded.sub);
            //console.log('Expiration:', new Date(decoded.exp * 1000));

            // 3. Redirect to Dashboard
            this.router.navigate(['/ProductCRUD']);
          }
        },
        error: (err) => {
          // Handle wrong password or server errors
          console.error('Login failed', err);
          alert('Invalid Username or Password');
        },
      });
    }
  }
}
