import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClientesService } from '../Services/clientes.service';
import Swal from 'sweetalert2';

// Definimos la interfaz basada en la estructura de la base de datos
interface ICliente {
  cliente_id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  listaclientes: ICliente[] = [];

  constructor(private clienteServicio: ClientesService) {}

  ngOnInit() {
    this.cargatabla();
  }

  // Cargar la lista de clientes desde el servicio
  cargatabla() {
    this.clienteServicio.todos().subscribe((data: ICliente[]) => {
      console.log(data);
      this.listaclientes = data;
    });
  }

  // Eliminar un cliente por su ID
  eliminar(cliente_id: number) {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: '¿Está seguro que desea eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminar(cliente_id).subscribe(() => {
          Swal.fire('Cliente eliminado', 'El cliente ha sido eliminado correctamente.', 'success');
  
