import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


import { IEmpresa } from '../interfaces/iempresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(){    
    return this.http.get<IEmpresa[]>(environment.apiURL+'empresa');
  }

  getEmpresa(id:string){
    return this.http.get<IEmpresa>(`${environment.apiURL}empresa/${id}`);
  }

  addEmpresa(empresa:IEmpresa){
    return this.http.post(`${environment.apiURL}empresa`, empresa);
  }

  updateEmpresa(empresa:IEmpresa){
   return this.http.put(`${environment.apiURL}empresa/${empresa.empresaID}`, empresa);
  }

  deleteEmpresa(id:string){
    return this.http.delete(`${environment.apiURL}empresa/${id}`);
  }
}
