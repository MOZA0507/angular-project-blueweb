import { Component } from '@angular/core';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../shared/table/table.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    TopbarComponent,
    SidebarComponent,
    TableComponent,
    CommonModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
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
