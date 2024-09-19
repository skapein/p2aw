import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IEvento  } from '../interfaces/ievento'; 

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost/p2aw/controller/eventos.controller.php?op='; 

  constructor(private http: HttpClient) {}

  // Método para crear un nuevo evento
  crearEvento(evento: IEvento): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', evento.nombre);
    formData.append('descripcion', evento.descripcion || '');
    formData.append('fecha', evento.fecha);
    formData.append('ubicacion', evento.ubicacion);

    return this.http.post(this.apiUrl + 'insertar', formData);
  }

  // Método para obtener todos los eventos
  obtenerEventos(): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(this.apiUrl + 'todos');
  }

  // Método para obtener un evento por ID
  obtenerEventoPorId(evento_id: number): Observable<IEvento> {
    const formData = new FormData();
    formData.append('evento_id', evento_id.toString());
    return this.http.post<IEvento>(this.apiUrl + 'uno', formData);
  }

  // Método para actualizar un evento
  actualizarEvento(evento: IEvento): Observable<any> {
    const formData = new FormData();
    formData.append('evento_id', evento.evento_id.toString());
    formData.append('nombre', evento.nombre);
    formData.append('descripcion', evento.descripcion || '');
    formData.append('fecha', evento.fecha);
    formData.append('ubicacion', evento.ubicacion);

    return this.http.post(this.apiUrl + 'actualizar', formData);
  }

  // Método para eliminar un evento
  eliminarEvento(evento_id: number): Observable<any> {
    const formData = new FormData();
    formData.append('evento_id', evento_id.toString());
    return this.http.post(this.apiUrl + 'eliminar', formData);
  }
}