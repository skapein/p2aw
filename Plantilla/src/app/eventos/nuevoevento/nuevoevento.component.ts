import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/eventos.service'; 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevoevento',
  templateUrl: './nuevoevento.component.html',
  styleUrls: ['./nuevoevento.component.scss']
})
export class NuevoEventoComponent implements OnInit {
  eventoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      nombre: [null, Validators.required],
      descripcion: [null],
      fecha: [null, Validators.required],
      ubicacion: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      this.eventoService.crearEvento(this.eventoForm.value).subscribe(
        response => {
          Swal.fire('Éxito', 'Evento creado con éxito', 'success');
          this.router.navigate(['/eventos']); // Ajusta la ruta según sea necesario
        },
        error => {
          Swal.fire('Error', 'Hubo un error al crear el evento', 'error');
          console.error('Error al crear el evento', error);
        }
      );
    } else {
      Swal.fire('Formulario inválido', 'Por favor, completa todos los campos', 'warning');
    }
  }
}