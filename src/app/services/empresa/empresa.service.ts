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

interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpresasCol():Column[]{
    return [
      { field: 'idEmpresa', header: 'Id' },
      { field: 'claveEmpresa', header: 'Clave' },
      { field: 'nombreEmpresa', header: 'Nombre' },
      { field: 'activo', header: 'Activo' },
      { 
        field: 'options',
        header: 'Options',
        type:'button',
        buttons: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            severity: 'warning'
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            severity: 'danger'
          }
        ]
      }
    ];
  }

  getEmpresas():Observable<any>{
    return this.http.get<any>(`${envs.apiUrl}/empresas`);
  }

  addEmpresa(alias: string, empresaName: string, active: boolean):Observable<any>{
    return this.http.post<any>(`${envs.apiUrl}/empresas`,{alias,empresaName,active});
  }

  editEmpresa(id: number, alias: string, empresaName: string, active: boolean):Observable<any>{
    return this.http.put<any>(`${envs.apiUrl}/empresas`,{id,alias,empresaName,active});
  }

  deleteEmpresa(id: number):Observable<any>{
    return this.http.delete<any>(`${envs.apiUrl}/empresas/${id}`);
  }
}
