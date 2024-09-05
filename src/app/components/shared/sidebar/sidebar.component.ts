import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SucursalService } from '../../../services/sucursal/sucursal.service';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<string>();
  items: any;

  constructor(private router: Router){}

  ngOnInit() {
    this.items = [
        {
            label: 'Navegar',
            items: [
                {
                    label: 'Inicio',
                    icon: 'pi pi-home',
                    command: () => {
                      this.router.navigate(['/inicio']);
                  }
                },
                {
                    label: 'Empresas',
                    icon: 'pi pi-building',
                    command: () => {
                        this.router.navigate(['/empresas']);
                    }
                },
                {
                    label: 'Sucursales',
                    icon: 'pi pi-shop',
                    command: () => {
                      this.router.navigate(['/sucursales']);
                  }
                }
            ]
        }
    ];
}

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
