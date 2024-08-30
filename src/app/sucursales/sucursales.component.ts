import { Component } from '@angular/core';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TableSursalesComponent } from '../shared/table-sursales/table-sursales.component';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [
    TopbarComponent,
    SidebarComponent,
    TableSursalesComponent,
    CommonModule
  ],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})
export class SucursalesComponent {
  sidebarOpen:boolean = false;
  titleLabel:string ='';

  onToggleSidebar(){
    this.sidebarOpen = true;
  }

  onCloseSidebar(){
    this.sidebarOpen = false;
  }

  onOptionSidebarSelected(title:string){
    console.log(title);
    this.titleLabel = title
    console.log(this.titleLabel);
  }
}
