// src/app/components/pet/pet.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pet } from '../../models/pets';
import { PetService } from '../../services/pet.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
})
export class PetComponent implements OnInit {
  petList: Pet[] = [];
  dataSource!: MatTableDataSource<Pet>;
  displayedColumns: string[] = ['id', 'nombre', 'especie', 'edad', 'descripcion', 'adoptado', 'action'];

  constructor(private service: PetService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.service.getAll().subscribe((pets) => {
      console.log('Mascotas desde API:', pets);
      this.petList = pets;
      this.dataSource = new MatTableDataSource(this.petList);
    });
  }

  editPet(id: number) {
  }

  deletePet(id: number) {
    if (confirm('¿Estás seguro de eliminar esta mascota?')) {
      this.service.delete(id).subscribe(() => {
        this.loadPets();
      });
    }
  }
}
