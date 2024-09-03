import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch'
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-add-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    FormsModule,
    ToastModule,
    RippleModule
  ],
  providers:[MessageService],
  templateUrl: './add-edit-dialog.component.html',
  styleUrl: './add-edit-dialog.component.css'
})
export class AddEditDialogComponent implements OnChanges {

  @Input() display: boolean = false;
  @Input() buttonAction: string = '';
  @Input() dialogInfo: any;
  @Output() close = new EventEmitter<boolean>();

  id: number = 0;
  alias: string = '';
  empresaName:string = '';
  active:boolean = false;

  constructor(
    private empresasService: EmpresaService,
    private messageService: MessageService){}

  ngOnChanges(){
    this.alias = this.dialogInfo?.claveEmpresa;
    this.empresaName = this.dialogInfo?.nombreEmpresa;
    this.id = this.dialogInfo?.idEmpresa;
    this.active = this.dialogInfo?.activo;
  }
  onClose(): void{
    this.close.emit(false);
  }

  onSave(): void {
    if(this.buttonAction === 'Agregar') {
      this.empresasService.addEmpresa(this.alias,this.empresaName,this.active).subscribe(
        (response:any) => {
          console.log(response);
          this.correctToastMessageGenerator(this.buttonAction);
          this.close.emit(true);
        },
        (error:any) =>{
          console.log(error);
          this.errorToastMessageGenerator(this.buttonAction);
        }
      );
    }
    if(this.buttonAction === 'Editar') {
      this.empresasService.editEmpresa(this.id,this.alias,this.empresaName,this.active).subscribe(
        (response:any) => {
          console.log(response);
          this.correctToastMessageGenerator(this.buttonAction);
          this.close.emit(true);
        },
        (error:any) => {
          console.log(error);
          this.errorToastMessageGenerator(this.buttonAction);
        }
      );
    }
    if(this.buttonAction === 'Borrar'){
      console.log('Delete action');
      this.empresasService.deleteEmpresa(this.id).subscribe(
        (response:any)=>{
          console.log(response);
          this.correctToastMessageGenerator(this.buttonAction);
          this.close.emit(true);
        },
        (error:any)=>{
          console.log(error);
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
        detail:'Se agrego correctamente la empresa'
      });
    }
    if(buttonAction === 'Editar'){
      this.messageService.add({
        severity: 'success',
        summary:'Operación exitosa',
        detail:'Se edito correctamente la empresa'
      });
    }
    if(buttonAction === 'Borrar'){
      this.messageService.add({
        severity: 'success',
        summary:'Operación exitosa',
        detail:'Se elimino correctamente la empresa'
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
