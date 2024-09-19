import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reservas.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.scss']
})
export class ReservacionesComponent implements OnInit {
  reservas: any[] = [];

  constructor(
    private reservaService: ReservaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerReservas();
  }

  obtenerReservas(): void {
    this.reservaService.obtenerReservas().subscribe(
      response => {
        this.reservas = response;
      },
      error => {
        console.error('Error al obtener las reservas', error);
      }
    );
  }

  crearReserva(): void {
    this.router.navigate(['/nueva-reserva']); // Ajusta la ruta según tu configuración
  }

  verDetalles(reserva: any): void {
    this.router.navigate(['/reserva-detalle', reserva.reserva_id]); // Ajusta la ruta según tu configuración
  }

  eliminarReserva(reservaId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.reservaService.eliminarReserva(reservaId).subscribe(
        () => {
          this.obtenerReservas(); // Actualiza la lista después de eliminar
          alert('Reserva eliminada con éxito');
        },
        error => {
          console.error('Error al eliminar la reserva', error);
          alert('Hubo un error al eliminar la reserva');
        }
      );
    }
  }
}
