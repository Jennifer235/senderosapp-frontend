import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Tabla } from '../../componentes/tabla/tabla';

@Component({
  selector: 'app-usuarios',
  imports: [Tabla],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  data: any[] = [];
  cargando = true;
  error = '';

  constructor(private usuariosService: UsuariosService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (rows: any[]) => {
        this.data = rows;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar los usuarios. ¿Está encendido el backend (npm start)?';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
