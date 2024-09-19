import { Component, OnInit } from '@angular/core';
import { EventosService } from '../services/eventos.service'; // Importar el servicio de eventos
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any[] = []; // Variable para almacenar los eventos

  constructor(
    private eventosService: EventosService, // Inyectar el servicio de eventos
    private router: Router // Inyectar el Router
  ) {}

  ngOnInit(): void {
    this.cargarEventos(); // Cargar los eventos al iniciar el componente
  }

  // Método para cargar la lista de eventos desde el servicio
  cargarEventos(): void {
    this.eventosService.obtenerEventos().subscribe(
      (data: any) => {
        this.eventos = data; // Asignar la data obtenida a la variable 'eventos'
      },
      (error) => {
        console.error('Error al obtener la lista de eventos:', error);
      }
    );
  }

  // Método para eliminar un evento
  eliminarEvento(evento_id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.eventosService.eliminarEvento(evento_id).subscribe(
        (response) => {
          console.log('Evento eliminado exitosamente:', response);
          this.cargarEventos(); // Volver a cargar los eventos después de eliminar uno
        },
        (error) => {
          console.error('Error al eliminar el evento:', error);
        }
      );
    }
  }

  // Método para ver el detalle de un evento (opcional, si quieres ver un detalle del evento)
  verEvento(evento_id: number): void {
    this.router.navigate(['/evento', evento_id]); // Navegar al detalle del evento
  }

  // Método para editar un evento (opcional, si quieres editar un evento)
  editarEvento(evento_id: number): void {
    this.router.navigate(['/editar-evento', evento_id]); // Navegar a la edición del evento
  }
}
