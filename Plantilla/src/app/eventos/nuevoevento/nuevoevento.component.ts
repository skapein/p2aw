import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service'; // Asegúrate de tener un servicio para manejar eventos

@Component({
  selector: 'app-nuevoevento',
  templateUrl: './nuevoevento.component.html',
  styleUrls: ['./nuevoevento.component.css']
})
export class NuevoEventoComponent implements OnInit {

  frm_evento: FormGroup;
  titulo: string = 'Crear Nuevo Evento';

  constructor(
    private fb: FormBuilder, 
    private eventosService: EventosService, 
    private router: Router
  ) {
    // Inicializa el formulario
    this.frm_evento = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]], // Campo requerido, mínimo 3 caracteres
      descripcion: [''], // Campo opcional
      fecha: ['', Validators.required], // Campo requerido
      ubicacion: ['', Validators.required] // Campo requerido
    });
  }

  ngOnInit(): void {
    // Puedes agregar cualquier lógica que necesites ejecutar al iniciar el componente
  }

  grabar(): void {
    if (this.frm_evento.valid) {
      // Captura los datos del formulario
      const nuevoEvento = {
        nombre: this.frm_evento.get('nombre')?.value,
        descripcion: this.frm_evento.get('descripcion')?.value,
        fecha: this.frm_evento.get('fecha')?.value,
        ubicacion: this.frm_evento.get('ubicacion')?.value
      };

      // Llamar al servicio para enviar el nuevo evento al backend
      this.eventosService.crearEvento(nuevoEvento).subscribe(
        (response) => {
          console.log('Evento creado exitosamente:', response);
          this.router.navigate(['/eventos']); // Redirige a la lista de eventos después de crear uno nuevo
        },
        (error) => {
          console.error('Error al crear el evento:', error);
        }
      );
    } else {
      // Muestra un mensaje de error o resalta los campos no válidos
      this.frm_evento.markAllAsTouched();
      console.log('Formulario no válido');
    }
  }
}
