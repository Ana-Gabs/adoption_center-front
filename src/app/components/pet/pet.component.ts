// src/app/components/pet/pet.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Pet } from '../../models/pets';
import { AddPetComponent } from '../addpet/addpet.component';

import { loadPets, deletePet } from '../../store/Pet.Action';
import { getPetsList } from '../../store/Pet.Selector';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-pet',
  standalone: true,
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    AddPetComponent,
  ]
})
export class PetComponent implements OnInit, OnDestroy {
  petList: Pet[] = [];
  dataSource!: MatTableDataSource<Pet>;
  displayedColumns: string[] = ['id', 'nombre', 'especie', 'edad', 'descripcion', 'adoptado', 'action'];
  subscription = new Subscription();

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.getAllPets();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllPets() {
    this.store.dispatch(loadPets());
    const sub = this.store.select(getPetsList).subscribe(pets => {
      if (pets) {
        this.petList = pets;
        this.dataSource = new MatTableDataSource(this.petList);
        console.log('Mascotas cargadas desde selector:', this.petList);
      } else {
        console.log('No se cargaron mascotas o la lista está vacía');
      }
    });
    this.subscription.add(sub);
  }




  addPet() {
    this.openPopup(0);
  }

  editPet(id: number) {
    this.openPopup(id);
  }


  deletePet(id: number) {
    if (confirm('¿Estás segura de eliminar esta mascota?')) {
      this.store.dispatch(deletePet({ petId: id }));
    }
  }

  openPopup(petId: number) {
    this.dialog.open(AddPetComponent, {
      width: '50%',
      data: { id: petId },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms'
    }).afterClosed().subscribe(() => {
      this.getAllPets();
    });
  }
}
