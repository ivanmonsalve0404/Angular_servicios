import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { Mapa } from '../../../models/mapa';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ColombiaService } from '../../../services/colombia.service';
import { Router } from '@angular/router';
import { observadorAny } from '../../../utilities/observador/tipo-any';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit, OnDestroy{

  public suscripcionMapa: Subscription;
  public tmp: any;
  public cargaFinalizada: boolean;

  public arrMapas: Mapa[];
  public mapaSeleccionado: Mapa;
  public codigoMapa: number;

  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  public modalTitulo: string;
  public modalContenido: string;
  public modalCuerpo: string;
  public modalImg: string[];
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private colombiaService: ColombiaService, private router: Router) {
    this.suscripcionMapa = this.tmp;
    this.cargaFinalizada = false;

    this.arrMapas = [];
    this.mapaSeleccionado = this.inicializarMapa();
    this.codigoMapa = 0;

    this.modalTitulo = "";
    this.modalContenido = "";
    this.modalCuerpo = "";
    this.modalImg = [];
    this.modalRef = this.tmp;

    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadPaginas = 0;
    this.cantidadTotalRegistros = 0;
  }


  ngOnInit(): void {
    this.obtenerMapas();
    this.cantidadMostrar = 5;
    this.paginaActual = 1;
  }
  ngOnDestroy(): void {
    if (this.suscripcionMapa) {
      this.suscripcionMapa.unsubscribe();
    }
  }

  private inicializarMapa(): Mapa {
    return new Mapa(0,"","",[]);
  }

  private obtenerMapas(): void {
    this.suscripcionMapa = this.colombiaService.obtenerMapas().pipe(
      map((respuesta) => {
        this.arrMapas = respuesta;
        this.cantidadTotalRegistros = this.arrMapas.length;
        this.cantidadPaginas = Math.ceil(this.cantidadTotalRegistros / this.cantidadMostrar);
        return respuesta;
      }), catchError((miError) => {
        throw miError;
      }), finalize(() => {
        this.cargaFinalizada = true;
      })
    ).subscribe(observadorAny)
  }

  /* Inicio ventana modal */
  
  public abrirVentanaDetalle(template: TemplateRef<any>, objMapa: Mapa): void {

    this.mapaSeleccionado = objMapa;
    this.modalRef = this.modalService.show(template, { class: "md"  })
    this.modalTitulo = this.mapaSeleccionado.name;
    this.modalContenido = this.mapaSeleccionado.description;
    this.modalImg = this.mapaSeleccionado.urlImages;
  
  }

  public botonCerrar(): void {
    this.modalRef.hide();
    this.mapaSeleccionado = this.inicializarMapa();
  }

  /* Fin ventana modal */

  public actualizarPaginador(): void {
    this.paginaActual = this.paginaActual;
    this.cantidadPaginas = Math.ceil(this.cantidadTotalRegistros / this.cantidadMostrar);
  }


  public cambiarPagina(evento: number) {
    this.paginaActual = evento;
    this.obtenerMapas();
    
  }

  public cambiarCantidadRegistros(valor: any): void {
    this.actualizarPaginador();
    this.obtenerMapas();
    
  }
}
