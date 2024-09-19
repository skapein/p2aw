import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReserva } from '../interfaces/ireserva'; // Asegúrate de definir la interfaz IReserva

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  apiurl = 'http://localhost/p2aw/controller/reservas.controller.php?op='; // Ajusta la URL según tu configuración

  constructor(private lector: HttpClient) {}

  // Obtener todas las reservaciones
  todas(): Observable<IReserva[]> {
    return this.lector.get<IReserva[]>(this.apiurl + 'todas');
  }

  // Obtener una reservación específica por ID
  una(id: number): Observable<IReserva> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<IReserva>(this.apiurl + 'una', formData);
  }

  // Eliminar una reservación
  eliminar(id: number): Observable<number> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Insertar una nueva reservación
  insertar(reserva: IReserva): Observable<string> {
    const formData = new FormData();
    formData.append('evento_id', reserva.evento_id.toString());
    formData.append('cliente_id', reserva.cliente_id.toString());
    // Puedes agregar otros campos si es necesario
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  // Actualizar una reservación existente
  actualizar(reserva: IReserva): Observable<string> {
    const formData = new FormData();
    formData.append('reservacion_id', reserva.reservacion_id.toString());
    formData.append('evento_id', reserva.evento_id.toString());
    formData.append('cliente_id', reserva.cliente_id.toString());
    // Puedes agregar otros campos si es necesario
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
