import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as urls from '../utilities/dominio/urls';
import { Mapa } from '../models/mapa';

@Injectable({
  providedIn: 'root'
})
export class ColombiaService {

  public urlMapa: string;


  constructor( private http: HttpClient) { 
    this.urlMapa=urls.MAPA;
  }

  public obtenerMapas(): Observable<Mapa[]>{
    return this.http.get<Mapa[]>(this.urlMapa);
  }
}
