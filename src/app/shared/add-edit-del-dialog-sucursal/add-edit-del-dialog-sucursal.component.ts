import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SucursalService } from '../../services/sucursal/sucursal.service';
import { EmpresaService } from '../../services/empresa/empresa.service';


@Component({
  selector: 'app-add-edit-del-dialog-sucursal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './add-edit-del-dialog-sucursal.component.html',
  styleUrl: './add-edit-del-dialog-sucursal.component.css'
})
export class AddEditDelDialogSucursalComponent implements OnChanges{
  @Input() display: boolean = false;
  @Input() buttonAction: string = '';
  @Input() dialogInfo: any;
  @Output() close = new EventEmitter<boolean>();

  id: number = 0;
  sucursalName: string = '';
  city: string = '';
  state: string = '';
  selectedEmpresa:any;
  active: boolean = false;
  empresas: any;

  constructor(
    private sucursalService: SucursalService,
    private empresaService: EmpresaService,
  ){}

  ngOnInit(){
    this.empresaService.getEmpresas().subscribe(
      (response:any)=>{
        this.empresas = response;
      },
      (err:any) => {
        console.log(err);
      }
    )
  }
  ngOnChanges(): void {
    this.sucursalName = this.dialogInfo?.nombreSucursal;
    this.city = this.dialogInfo?.ciudad;
    this.state = this.dialogInfo?.estado;
    this.active = this.dialogInfo?.activo;
    this.id = this.dialogInfo?.idSucursal;
  }

  onClose(): void{
    this.close.emit(false);
  }

  onSave(): void{
    if(this.buttonAction === 'Add'){
      this.sucursalService.addSucursal(this.selectedEmpresa.idEmpresa,
        this.sucursalName, this.city, this.state, this.active).subscribe(
          (response:any) => {
            console.log(response);            
            this.close.emit(true);
          },
          (err:any) =>{
            console.log(err);
          }
        )
    }
    if(this.buttonAction === 'Edit'){
      this.sucursalService.editSucursal(this.id, this.selectedEmpresa.idEmpresa, this.sucursalName,
        this.city, this.state, this.active).subscribe(
          (response:any)=>{
            console.log(response);
            this.close.emit(true);
          },
          (err:any) => {
            console.log(err);
          }
        )
    }
    if(this.buttonAction === 'Delete'){
      this.sucursalService.deleteSucursal(this.id).subscribe(
        (response:any) =>{
          console.log(response);
          this.close.emit(true);
        },
        (err:any) => {
          console.log(err);
        }
      )
    }
  }
}
