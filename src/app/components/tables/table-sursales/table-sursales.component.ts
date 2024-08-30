import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SucursalService } from '../../../services/sucursal/sucursal.service';
import { AddEditDialogComponent } from '../../dialogs/add-edit-dialog/add-edit-dialog.component';
import { AddEditDelDialogSucursalComponent } from '../../dialogs/add-edit-del-dialog-sucursal/add-edit-del-dialog-sucursal.component';

interface Column {
  field: string;
  header: string;
  type?: string;
  buttons? :any;
}

interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

interface ProductWithBrand {
  code: string;
  name: string;
  category: string;
  brand: string
  quantity: number;
}

@Component({
  selector: 'app-table-sursales',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, AddEditDelDialogSucursalComponent],
  templateUrl: './table-sursales.component.html',
  styleUrl: './table-sursales.component.css'
})
export class TableSursalesComponent {
  @Input() title!: string;
  info!: Product[]|ProductWithBrand[];
  cols!: Column[];
  displayDialog: boolean = false;
  buttonAction: string = '';
  selectedRow: any;

  constructor(
    private sucursalService: SucursalService
  ){
    
  }

  ngOnInit(){
    this.title = 'Sucursales';
    this.cols = this.sucursalService.getSucursalesCol();
    this.loadSucursales();
  }

  loadSucursales(){
    this.sucursalService.getSucursales().subscribe(
      (response: any) => {
        this.info = response;
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  openDialog(event: Event, rowData: any): void {
    this.selectedRow = rowData;
    console.log(this.selectedRow);
    this.buttonAction = '';
    let buttonText = '';
    buttonText = (event.target as HTMLButtonElement).innerText;
    this.buttonAction = buttonText;
    this.displayDialog = true;
  }

  closeDialog(changesMade: boolean): void {
    this.displayDialog = false;
    if(changesMade){
      this.loadSucursales();
    }
  }
}
