import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReserva } from '../interfaces/ireserva'; // Asegúrate de definir la interfaz IReserva

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiurl = 'http://localhost/p2aw/controller/reservas.controller.php?op='; // Ajusta la ruta según tu proyecto

  constructor(private http: HttpClient) {}

  // Método para crear una nueva reserva
  crearReserva(reserva: any): Observable<any> {
    const formData = new FormData();
    formData.append('evento_id', reserva.evento_id);
    formData.append('cliente_id', reserva.cliente_id);
    formData.append('fecha_reservacion', reserva.fecha_reservacion);

    return this.http.post(this.apiurl + 'insertar', formData);
  }

  // Método para obtener todas las reservas
  obtenerReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl + 'todos');
  }

  // Método para obtener una reserva por ID
  obtenerReservaPorId(reservacion_id: number): Observable<any> {
    const formData = new FormData();
    formData.append('reservacion_id', reservacion_id.toString());
    return this.http.post<any>(this.apiurl + 'uno', formData);
  }

  // Método para actualizar una reserva
  actualizarReserva(reserva: any): Observable<any> {
    const formData = new FormData();
    formData.append('reservacion_id', reserva.reservacion_id);
    formData.append('evento_id', reserva.evento_id);
    formData.append('cliente_id', reserva.cliente_id);
    formData.append('fecha_reservacion', reserva.fecha_reservacion);

    return this.http.post(this.apiurl + 'actualizar', formData);
  }

  // Método para eliminar una reserva
  eliminarReserva(reservacion_id: number): Observable<any> {
    const formData = new FormData();
    formData.append('reservacion_id', reservacion_id.toString());
    return this.http.post(this.apiurl + 'eliminar', formData);
  }
}