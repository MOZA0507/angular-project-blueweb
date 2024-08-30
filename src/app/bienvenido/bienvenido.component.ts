import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [
    ImageModule,
    TopbarComponent,
    SidebarComponent,
    CommonModule
  ],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent {
  sidebarOpen:boolean = false;
  title:string ='';

  onToggleSidebar(){
    this.sidebarOpen = true;
  }

  onCloseSidebar(){
    this.sidebarOpen = false;
  }

  onOptionSidebarSelected(title:string){
    this.title = title
  }
}
