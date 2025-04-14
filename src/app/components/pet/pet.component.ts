// src/app/componnets/pet/pet.components.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Pet } from '../../models/pets';
import { AddPetComponent } from '../addpet/addpet.component';
import { getPetsList } from '../../store/Pet.Selector';
import { deletePet, loadPets } from '../../store/Pet.Action';

@Component({
  selector: 'app-pet',
  standalone: true,
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class PetComponent implements OnInit, OnDestroy {

  petList: Pet[] = [];
  dataSource!: MatTableDataSource<Pet>;
  displayedColumns: string[] = ['id', 'nombre', 'especie', 'raza', 'edad', 'genero', 'historial_medico', 'action'];
  subscription = new Subscription();

  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.getAllPets();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllPets() {
    this.store.dispatch(loadPets());
    this.store.select(getPetsList).subscribe(item => {
      console.log('Mascotas en comp:', item);
      this.petList = item;
      this.dataSource = new MatTableDataSource(this.petList);
    });
  }

  addPet() {
    this.openPopup(0);
  }

  editPet(id: number) {
    this.openPopup(id);
  }

  deletePet(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.store.dispatch(deletePet({ petId: id }));
    }
  }

  openPopup(petId: number) {
    this.dialog.open(AddPetComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: petId,
      }
    }).afterClosed().subscribe(() => {
      this.getAllPets();
    });
  }
}
