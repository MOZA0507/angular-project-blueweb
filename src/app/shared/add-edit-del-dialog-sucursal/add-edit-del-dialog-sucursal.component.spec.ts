import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDelDialogSucursalComponent } from './add-edit-del-dialog-sucursal.component';

describe('AddEditDelDialogSucursalComponent', () => {
  let component: AddEditDelDialogSucursalComponent;
  let fixture: ComponentFixture<AddEditDelDialogSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDelDialogSucursalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditDelDialogSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
