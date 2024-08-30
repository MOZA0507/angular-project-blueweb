import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { SucursalService } from '../../../services/sucursal/sucursal.service';
import { AddEditDialogComponent } from '../../dialogs/add-edit-dialog/add-edit-dialog.component';

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


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, AddEditDialogComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent{
  @Input() titleLabel!: string;
  info!: any[];
  cols!: any[];
  displayDialog: boolean = false;
  buttonAction: string = '';
  selectedRow: any;

  constructor(
    private empresaService: EmpresaService,
  ){}

  ngOnInit(){
    this.titleLabel = 'Empresas';
    this.cols = this.empresaService.getEmpresasCol();
    this.loadEmpresas();
    
  }

  loadEmpresas(){
    this.empresaService.getEmpresas().subscribe(
      (response:any)=>{
        this.info = response
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }

  openDialog(event: Event, rowData: any): void {
    this.selectedRow = rowData;
    console.log(this.selectedRow);
    this.buttonAction = '';
    let buttonText = ''
    buttonText = (event.target as HTMLButtonElement).innerText;
    this.buttonAction = buttonText;
    this.displayDialog = true;
  }

  closeDialog(changesMade:boolean): void {
    this.selectedRow = null;
    this.displayDialog = false;
    if(changesMade){
      this.loadEmpresas();
    }
  }

}
