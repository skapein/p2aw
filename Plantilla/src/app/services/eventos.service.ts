import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvento } from '../interfaces/ievento'; // Asegúrate de tener esta interfaz definida

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  apiurl = 'http://localhost/p2aw/controller/eventos.controller.php?op='; // Ajusta la URL según tu configuración

  constructor(private lector: HttpClient) {}

  // Obtener todos los eventos
  todos(): Observable<IEvento[]> {
    return this.lector.get<IEvento[]>(this.apiurl + 'todos');
  }

  // Obtener un evento específico por ID
  uno(id: number): Observable<IEvento> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<IEvento>(this.apiurl + 'uno', formData);
  }

  // Eliminar un evento
  eliminar(id: number): Observable<number> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Insertar un nuevo evento
  insertar(evento: IEvento): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', evento.nombre);
    formData.append('descripcion', evento.descripcion);
    formData.append('fecha', evento.fecha);
    formData.append('ubicacion', evento.ubicacion);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar un evento existente
  actualizar(evento: IEvento): Observable<string> {
    const formData = new FormData();
    formData.append('evento_id', evento.evento_id.toString());
    formData.append('nombre', evento.nombre);
    formData.append('descripcion', evento.descripcion);
    formData.append('fecha', evento.fecha);
    formData.append('ubicacion', evento.ubicacion);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
