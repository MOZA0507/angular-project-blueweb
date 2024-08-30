import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSursalesComponent } from './table-sursales.component';

describe('TableSursalesComponent', () => {
  let component: TableSursalesComponent;
  let fixture: ComponentFixture<TableSursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSursalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
