import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from 'src/app/services/reservas.service'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevareserva',
  templateUrl: './nuevareserva.component.html',
  styleUrls: ['./nuevareserva.component.scss']
})
export class NuevaReservaComponent implements OnInit {
  reservaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      evento_id: [null, Validators.required],
      cliente_id: [null, Validators.required],
      fecha_reservacion: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      this.reservaService.crearReserva(this.reservaForm.value).subscribe(
        response => {
          Swal.fire('Éxito', 'Reserva creada con éxito', 'success');
          this.router.navigate(['/reservas']); // Ajusta la ruta según sea necesario
        },
        error => {
          Swal.fire('Error', 'Hubo un error al crear la reserva', 'error');
          console.error('Error al crear la reserva', error);
        }
      );
    } else {
      Swal.fire('Formulario inválido', 'Por favor, completa todos los campos', 'warning');
    }
  }
}
