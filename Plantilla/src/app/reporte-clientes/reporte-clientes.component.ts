import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service'; 
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['./reporte-clientes.component.scss']
})
export class ReporteClientesComponent implements OnInit {
  clientes: any[] = [];

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clientesService.todos().subscribe(
      data => {
        this.clientes = data;
      },
      error => {
        console.error('Error al obtener clientes', error);
      }
    );
  }

  generarPDF(): void {
    const doc = new jsPDF();

    // Obtener el HTML del reporte
    const elemento = document.getElementById('reporte');
    if (elemento) {
      html2canvas(elemento).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('reporte-clientes.pdf');
      });
    }
  }
}
