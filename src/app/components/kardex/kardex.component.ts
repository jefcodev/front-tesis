import { Component, OnInit } from '@angular/core';


// Generar PDF
import  jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable'; 




import { ModelKardexI } from '../../modelos/modelo.kardex';
import { KardexService } from '../../servicios/kardex/kardex.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
;


@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.scss']
})
export class KardexComponent implements OnInit {
  kardex: any[] = [];

  personasFiltradas: any[] = [];
  exportColumns: any[] = [];

  cols: any[] = [];

 


  formbusqueda = new FormGroup({
    busqueda: new FormControl(''),

  });
  constructor(private dexServices: KardexService) { }
  public src: string | undefined;

  ngOnInit(): void {
    this.showAllkadex();
    // busqueda 
    this.dexServices.obtenerPersonas().subscribe(kardex => {
      this.kardex = kardex;
      this.personasFiltradas = kardex;
    });

    // Reporte pdf
    this.cols = [
      { field: 'id_bitacora', header: 'Id', customExportHeader: 'CategoríaId' },
     /*  { field: 'movimiento', header: 'Fecha' }, */
      { field: 'movimiento', header: 'Movimiento' },
      { field: 'accion', header: 'Acción' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'ayudante', header: 'Ayudante' },
      { field: 'observacion', header: 'Observación' },
      { field: 'numero_acta', header: '# Acta' },
      { field: 'usuario', header: 'Usuario' },

    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }
      ))


  }

  /* generarPDF() {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts:true
    });

    let tabla = '';
    tabla += '<table><thead><tr style="font-size: 4px;><th>ID Bitácora</th><th>Fecha Actual</th><th>Acción</th><th>Ayudante</th><th>Cliente</th><th>Observación</th><th>Número de acta</th><th>Usuario</th></tr></thead><tbody>';
    this.personasFiltradas.forEach(registro => {
      tabla += `<tr style="font-size: 4px;><td>${registro.id_bitacora}</td><td>${registro.fecha_actual}</td><td>${registro.accion}</td><td>${registro.ayudante}</td><td>${registro.cliente}</td><td>${registro.observacion}</td><td>${registro.numero_acta}</td><td>${registro.usuario}</td></tr>`;
    });
    tabla += '</tbody></table>';

    const logo = new Image();
    logo.src = 'src\assets\Logo.png';
    
    logo.crossOrigin = 'Anonymous';

    logo.onload = function() {
      doc.addImage(logo, 'PNG', 15, 15, 50, 50);
      doc.html(tabla, {
        callback: () => {
          doc.save('reporte.pdf');
        }
      });
    };
  } */
  exportPdf() {

    import("jspdf").then(jsPDF => {
     import("jspdf-autotable").then(x => {
         const doc = new jsPDF.default();
         (doc as any).autoTable(this.exportColumns,this.kardex)
         window.open(doc.output('bloburl'))
     })
 })
   
 }

/*   generarPDF() {
    let tabla = '';
    tabla += ' <br><br><table style="font-size: 4px; border:  0.5px  black; border-collapse: collapse; width: 100%; text-align: center;"><thead style="background-color: lightblue;"><tr><th style="border:  0.5px  black;">ID Bitácora</th><th style="border:  0.5px  black;">Fecha Actual</th><th style="border:  0.5px  black;">Acción</th><th style="border:  0.5px  black;">Ayudante</th><th style="border:  0.5px  black;">Cliente</th><th style="border:  0.5px  black;">Observación</th><th style="border:  0.5px  black;">Número de acta</th><th style="border:  0.5px  black;">Usuario</th></tr></thead><tbody>';
    this.personasFiltradas.forEach(registro => {
      tabla += `<tr style="font-size: 4px;"><td style="border:  0.5px  black;">${registro.id_bitacora}</td><td style="border:  0.5px  black;">${registro.fecha_actual}</td><td style="border:  0.5px  black;">${registro.accion}</td><td style="border:  0.5px  black;">${registro.ayudante}</td><td style="border:  0.5px  black;">${registro.cliente}</td><td style="border:  0.5px  black;">${registro.observacion}</td><td style="border:  0.5px  black;">${registro.numero_acta}</td><td style="border:  0.5px  black;">${registro.usuario}</td></tr>`;
    });
    tabla += '</tbody></table>';

    const logo = new Image();
    logo.src = '/assets/pdf.jpg';
    logo.crossOrigin = 'Anonymous';

    logo.onload = function() {
      doc.addImage(logo, 'PNG', 60, 10, 80, 20);
      doc.html(tabla, {
        callback: () => {
          window.open(doc.output('bloburl'))

        }
      });
    };
  } */
  


  


  filtrarPersonas(event: any) {
    const texto = (event.target as HTMLInputElement).value;

    this.personasFiltradas = this.kardex.filter(kardex => {


      return kardex.cliente.toLowerCase().includes(texto.toLowerCase()) ||
      kardex.ayudante.toLowerCase().includes(texto.toLowerCase()) || kardex.observacion.toLowerCase().includes(texto.toLowerCase())
      || kardex.movimiento.toLowerCase().includes(texto.toLowerCase());

    });
  }

  

  showAllkadex() {
    this.dexServices.getAllBitacora().subscribe(
      (kardex: any) => {
        this.kardex = kardex

      },
      (error) => console.log(error)
    );
  }

  search(value: any) {
    console.log(value)
    this.formbusqueda.setValue({
      busqueda: value
    })

    this.dexServices.saveBitacoraBy(this.formbusqueda).subscribe(
      (kardex: any) => {
        this.kardex = kardex
        console.log(kardex)
      },
      (error) => console.log(error)
    );
  }
}
