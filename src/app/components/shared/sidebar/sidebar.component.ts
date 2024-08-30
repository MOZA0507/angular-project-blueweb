import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SucursalService } from '../../../services/sucursal/sucursal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<string>();

  constructor(private router: Router){}

  onClose(){
    this.closeSidebar.emit();
  }

  empresaSelected(){
    this.optionSelected.emit('Empresas');
    this.closeSidebar.emit();
    this.router.navigate(['/empresas']);
  }

  sucursalSelected(){
    this.optionSelected.emit('Sucursales');
    this.closeSidebar.emit();
    this.router.navigate(['/sucursales']);
  }

  inicioSelected(){
    this.optionSelected.emit('Inicio');
    this.closeSidebar.emit();
    this.router.navigate(['/inicio']);
  }
}
