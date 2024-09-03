import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { LogoutDialogComponent } from '../../dialogs/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ButtonModule, ImageModule, LogoutDialogComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  username: string|null = ''
  displayDialog: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>()

  constructor(){
    this.getLocalStorageUser();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  getLocalStorageUser(){
    this.username = localStorage.getItem('username');
  }

  logoutDisplay(){
    this.displayDialog = true;
  }

  closeLogoutDisplay(){
    this.displayDialog = false;
  }
}
