import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch'
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../../../services/empresa/empresa.service';

@Component({
  selector: 'app-add-edit-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputSwitchModule, FormsModule],
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

  constructor(private empresasService: EmpresaService){}

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
    if(this.buttonAction === 'Add') {
      this.empresasService.addEmpresa(this.alias,this.empresaName,this.active).subscribe(
        (response:any) => {
          console.log(response);
          this.close.emit(true);
        },
        (error:any) =>{
          console.log(error);
        }
      );
    }
    if(this.buttonAction === 'Edit') {
      this.empresasService.editEmpresa(this.id,this.alias,this.empresaName,this.active).subscribe(
        (response:any) => {
          console.log(response);
          this.close.emit(true);
        },
        (error:any) => {
          console.log(error);
        }
      );
    }
    if(this.buttonAction === 'Delete'){
      console.log('Delete action');
      this.empresasService.deleteEmpresa(this.id).subscribe(
        (response:any)=>{
          console.log(response);
          this.close.emit(true);
        },
        (error:any)=>{
          console.log(error);
        }
      )
    }
  }
}
