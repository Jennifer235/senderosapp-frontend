import { Component, Input, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

// Títulos legibles para las columnas que vienen de la base de datos
const TITULOS: Record<string, string> = {
  id: 'ID',
  nombre: 'Nombre',
  apellido: 'Apellido',
  descripcion: 'Descripción',
  ubicacion: 'Ubicación',
  distancia_km: 'Distancia (km)',
  dificultad: 'Dificultad',
  duracion_horas: 'Duración (h)',
  altitud_max_m: 'Altitud máx. (m)',
  activo: 'Activo',
  fecha_creacion: 'Fecha de creación',
  fecha_registro: 'Fecha de registro',
  email: 'Correo',
  telefono: 'Teléfono',
  rol: 'Rol',
  categoria: 'Categoría',
  precio: 'Precio',
  stock: 'Stock',
};

@Component({
  selector: 'app-tabla',
  imports: [MatTableModule],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css',
})
export class Tabla implements OnChanges {
  @Input() data: any[] = [];
  columns: string[] = [];

  ngOnChanges(): void {
    if (this.data && this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    } else {
      this.columns = [];
    }
  }

  titulo(columna: string): string {
    if (TITULOS[columna]) return TITULOS[columna];
    const texto = columna.replace(/_/g, ' ');
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  valor(fila: any, columna: string): string {
    const v = fila[columna];
    if (v === null || v === undefined || v === '') return 'Sin registrar';
    if (typeof v === 'boolean') return v ? 'Sí' : 'No';
    if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
      return new Date(v).toLocaleDateString('es-CO');
    }
    if (columna === 'precio' && typeof v === 'number') {
      return v.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
    }
    return String(v);
  }

  vacio(fila: any, columna: string): boolean {
    const v = fila[columna];
    return v === null || v === undefined || v === '';
  }
}
