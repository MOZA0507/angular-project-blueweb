import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envs } from '../../envs/envs';

interface Column {
  field: string;
  header: string;
  type?: string;
  buttons? :any;
}

interface ProductWithBrand {
  code: string;
  name: string;
  category: string;
  brand: string
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http: HttpClient) { }

  getSucursalesCol():Column[]{
    return [
      { field: 'idSucursal', header: 'Id' },
      { field: 'nombreSucursal', header: 'Nombre Sucursal' },
      { field: 'claveEmpresa', header: 'Clave Empresa' },
      { field: 'ciudad', header: 'Ciudad' },
      { field: 'estado', header: 'Estado'},
      { field: 'activo', header: 'Activo'},
      { 
        field: 'options',
        header: 'Opciones',
        type:'button',
        buttons: [
          {
            label: 'Editar',
            icon: 'pi pi-pencil',
            severity: 'warning'
          },
          {
            label: 'Borrar',
            icon: 'pi pi-trash',
            severity: 'danger'
          }
        ]
      }
    ];
  }

  getSucursalesContent(): ProductWithBrand[] {
    return [
      {code: 'f230fh0g3',name: 'Bamboo Watch', category: 'Accessories', brand: 'Rolex', quantity: 20},
      {code: 'nvklal433',name: 'Black Watch', category: 'Accessories', brand: 'Casio', quantity: 15},
      {code: 'zz21cz3c1',name: 'Blue Band', category: 'Fitness', brand:'Adidas', quantity: 18},
      {code: '244wgerg2',name: 'Black T-Shirt', category: 'Clothing',brand:'Uniqlo', quantity: 23},
      {code: '285wglrg2',name: 'Red T-Shirt', category: 'Clothing', brand:'H&M', quantity: 52},
    ];
  }

  getSucursales():Observable<any>{
    return this.http.get<any>(`${envs.apiUrl}/sucursales`);
  }

  addSucursal(idEmpresa: number, sucursalName:string, city:string, state:string, active:boolean):Observable<any>{
    return this.http.post<any>(`${envs.apiUrl}/sucursales`,{idEmpresa,sucursalName,city,state,active});
  }

  editSucursal(idSucursal:number, idEmpresa:number, sucursalName:string, city: string, state:string, active:boolean):Observable<any>{
    return this.http.put<any>(`${envs.apiUrl}/sucursales`,{idSucursal,idEmpresa,sucursalName,city,state,active});
  }

  deleteSucursal(idSucursal:number):Observable<any>{
    return this.http.delete<any>(`${envs.apiUrl}/sucursales/${idSucursal}`);
  }
}
