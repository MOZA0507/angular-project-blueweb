import { Component } from '@angular/core';
import { TopbarComponent } from '../../components/shared/topbar/topbar.component';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/tables/table/table.component';

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
