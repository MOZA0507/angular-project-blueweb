import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = ''
  password: string = ''
  isUsernameMessageVisible: boolean = false;
  isPasswordMessageVisible: boolean = false;
  isLoginMessageVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  verifyLogin(){
    let userVerification: boolean = false;
    let passwordVerification: boolean = false;
    userVerification = this.username.length <= 12 ;
    passwordVerification = this.password.length <= 18;
    this.isUsernameMessageVisible = !userVerification;
    this.isPasswordMessageVisible = !passwordVerification;
    this.authService.login(this.username,this.password).subscribe(
      (response:any) => {
        if(response.user){
          this.isLoginMessageVisible = false;
          this.saveUserSession(response.user, response.token);
          this.router.navigate(['/inicio']);
          console.log(response)
        }
      },
      (error:any) =>{
        console.log(error);
        this.isLoginMessageVisible = true;
      }
    );
    /* console.log(userExists);
    if(userExists) {
      this.saveUserSession(this.username);
      this.router.navigate(['/inicio']);
    } else {
      this.isLoginMessageVisible = !userExists;
    } */
  }

  saveUserSession(username: string, token: string){
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  }
}
