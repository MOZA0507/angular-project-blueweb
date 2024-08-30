import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ButtonModule, ImageModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  username: string|null = ''
  @Output() toggleSidebar = new EventEmitter<void>()

  constructor(private router: Router, private authService: AuthService){
    this.getLocalStorageUser();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  getLocalStorageUser(){
    this.username = localStorage.getItem('username');
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
