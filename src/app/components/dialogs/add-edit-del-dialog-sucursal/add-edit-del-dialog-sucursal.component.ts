import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SucursalService } from '../../../services/sucursal/sucursal.service';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-add-edit-del-dialog-sucursal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    RippleModule
  ],
  providers:[MessageService],
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
    private messageService: MessageService
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
    console.log(this.buttonAction);
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
    if(this.buttonAction === 'Agregar'){
      this.sucursalService.addSucursal(this.selectedEmpresa.idEmpresa,
        this.sucursalName, this.city, this.state, this.active).subscribe(
          (response:any) => {
            console.log(response);
            this.correctToastMessageGenerator(this.buttonAction);            
            this.close.emit(true);
          },
          (err:any) =>{
            console.log(err);
            this.errorToastMessageGenerator(this.buttonAction);
          }
        )
    }
    if(this.buttonAction === 'Editar'){
      this.sucursalService.editSucursal(this.id, this.selectedEmpresa.idEmpresa, this.sucursalName,
        this.city, this.state, this.active).subscribe(
          (response:any)=>{
            console.log(response);
            this.correctToastMessageGenerator(this.buttonAction)
            this.close.emit(true);
          },
          (err:any) => {
            console.log(err);
            this.errorToastMessageGenerator(this.buttonAction);
          }
        )
    }
    if(this.buttonAction === 'Borrar'){
      this.sucursalService.deleteSucursal(this.id).subscribe(
        (response:any) =>{
          console.log(response);
          this.correctToastMessageGenerator(this.buttonAction);
          this.close.emit(true);
        },
        (err:any) => {
          console.log(err);
          this.errorToastMessageGenerator(this.buttonAction);
        }
      )
    }
  }
  private correctToastMessageGenerator(buttonAction: string){
    if(buttonAction === 'Agregar'){
      return this.messageService.add({
        severity: 'success',
        summary:'Operación exitosa',
        detail:'Se agrego correctamente la sucursal'
      });
    }
    if(buttonAction === 'Editar'){
      this.messageService.add({
        severity: 'success',
        summary:'Operación exitosa',
        detail:'Se edito correctamente la sucursal'
      });
    }
    if(buttonAction === 'Borrar'){
      this.messageService.add({
        severity: 'success',
        summary:'Operación exitosa',
        detail:'Se elimino correctamente la sucursal'
      });
    }
  }

  private errorToastMessageGenerator(buttonAction: string) {
    if( buttonAction === 'Agregar') {
      return this.messageService.add({
        severity: 'error',
        summary:'Error en la operación',
        detail:'Error a la hora de intentar agregar un registro'
      });
    }
    if(buttonAction === 'Editar'){
      this.messageService.add({
        severity: 'error',
        summary:'Error en la operación',
        detail:'Error a la hora de intentar editar el registro'
      });
    }
    if(buttonAction === 'Eliminar'){
      return this.messageService.add({
        severity: 'error',
        summary:'Error en la operación',
        detail:'Error a la hora de intentar eliminar el registro'
      });
    }
  }
}
