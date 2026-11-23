import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SenderosService } from '../../services/senderos.service';
import { Tabla } from '../../componentes/tabla/tabla';

@Component({
  selector: 'app-rutas',
  imports: [Tabla],
  templateUrl: './rutas.html',
  styleUrl: './rutas.css',
})
export class Rutas implements OnInit {
  data: any[] = [];
  cargando = true;
  error = '';

  constructor(private rutasService: SenderosService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.rutasService.getSenderos().subscribe({
      next: (rows: any[]) => {
        this.data = rows;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar las rutas. ¿Está encendido el backend (npm start)?';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
