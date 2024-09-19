import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../services/reservas.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevareserva',
  templateUrl: './nuevareserva.component.html',
  styleUrls: ['./nuevareserva.component.css']
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
      cliente_id: [null, Validators.required],
      evento_id: [null, Validators.required],
      fecha: [null, Validators.required],
      ubicacion: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      this.reservaService.crearReserva(this.reservaForm.value).subscribe(
        response => {
          console.log('Reserva creada con éxito', response);
          this.router.navigate(['/reservas']); // Redirige a una página de reservas, ajusta según sea necesario
        },
        error => {
          console.error('Error al crear la reserva', error);
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }
}
