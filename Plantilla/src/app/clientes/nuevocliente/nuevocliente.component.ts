import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { ICliente } from 'src/app/interfaces/icliente';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevocliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.scss']
})
export class NuevoclienteComponent implements OnInit {
  frm_Cliente = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  cliente_id = 0;
  titulo = 'Nuevo Cliente';

  constructor(
    private clienteServicio: ClientesService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cliente_id = parseInt(this.ruta.snapshot.paramMap.get('cliente_id'));
    if (this.cliente_id > 0) {
      this.clienteServicio.uno(this.cliente_id).subscribe((uncliente) => {
        this.frm_Cliente.controls['nombre'].setValue(uncliente.nombre);
        this.frm_Cliente.controls['apellido'].setValue(uncliente.apellido);
        this.frm_Cliente.controls['telefono'].setValue(uncliente.telefono);
        this.frm_Cliente.controls['email'].setValue(uncliente.email);
        this.titulo = 'Editar Cliente';
      });
    }
  }

  grabar() {
    let cliente: ICliente = {
      cliente_id: this.cliente_id,
      nombre: this.frm_Cliente.controls['nombre'].value,
      apellido: this.frm_Cliente.controls['apellido'].value,
      telefono: this.frm_Cliente.controls['telefono'].value,
      email: this.frm_Cliente.controls['email'].value
    };

    Swal.fire({
      title: 'Clientes',
      text: 'Desea guardar al Cliente ' + this.frm_Cliente.controls['nombre'].value + ' ' + this.frm_Cliente.controls['apellido'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.cliente_id > 0) {
          this.clienteServicio.actualizar(cliente).subscribe((res: any) => {
            Swal.fire({
              title: 'Clientes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/clientes']);
          });
        } else {
          this.clienteServicio.insertar(cliente).subscribe((res: any) => {
            Swal.fire({
              title: 'Clientes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/clientes']);
          });
        }
      }
    });
  }
}
