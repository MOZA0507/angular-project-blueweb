import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css'
})
export class LogoutDialogComponent {
  @Input() display:boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router){}

  showDialog(){}

  onClose(){
    this.close.emit();
  }

  logout(){
    this.close.emit();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
