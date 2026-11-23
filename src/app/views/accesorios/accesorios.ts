import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccesoriosService } from '../../services/accesorios.service';
import { Tabla } from '../../componentes/tabla/tabla';

@Component({
  selector: 'app-accesorios',
  imports: [Tabla],
  templateUrl: './accesorios.html',
  styleUrl: './accesorios.css',
})
export class Accesorios implements OnInit {
  data: any[] = [];
  cargando = true;
  error = '';

  constructor(private accesoriosService: AccesoriosService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.accesoriosService.getAccesorios().subscribe({
      next: (rows: any[]) => {
        this.data = rows;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar los accesorios. ¿Está encendido el backend (npm start)?';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
