import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ICliente } from '../interfaces/icliente';  // Interfaz de cliente
import { ClientesService } from '../services/clientes.service'; // Servicio de clientes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  // Lista para almacenar los clientes
  listaclientes: ICliente[] = [];

  constructor(private clienteServicio: ClientesService) {}

  ngOnInit() {
    // Cargar la tabla de clientes al iniciar el componente
    this.cargatabla();
  }

  // Método para cargar los clientes desde el servicio
  cargatabla() {
    this.clienteServicio.todos().subscribe((data) => {
      this.listaclientes = data;
    });
  }

  // Método para eliminar un cliente por su ID
  eliminar(id: number) {
    Swal.fire({
      title: 'Clientes',
      text: '¿Está seguro que desea eliminar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Cliente'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al servicio para eliminar el cliente
        this.clienteServicio.eliminar(id).subscribe((data) => {
          if (data) {
            // Si el cliente fue eliminado exitosamente
            Swal.fire('Clientes', 'El cliente ha sido eliminado.', 'success');
            // Recargar la tabla de clientes
            this.cargatabla();
          } else {
            // Si no se pudo eliminar el cliente debido a restricciones
            Swal.fire(
              'Clientes',
              'El cliente no se pudo eliminar, porque se han creado órdenes a su nombre.',
              'info'
            );
          }
        });
      }
    });
  }
}
