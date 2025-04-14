import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from '../../models/pets';
import { PetService } from '../../services/pet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addpet',
  standalone: true,
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AddPetComponent implements OnInit {
  title = 'Agregar Mascota';
  isEdit = false;
  petForm: FormGroup;

  constructor(
    private petService: PetService,
    private ref: MatDialogRef<AddPetComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.petForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      especie: new FormControl('', Validators.required),
      edad: new FormControl('', [Validators.required, Validators.min(0)]),
      descripcion: new FormControl('', Validators.required),
      adoptado: new FormControl(false)
    });
  }

  ngOnInit(): void {
    if (this.data?.id > 0) {
      this.title = 'Editar Mascota';
      this.isEdit = true;
      this.petService.getById(this.data.id).subscribe(pet => {
        if (pet) {
          this.petForm.setValue({
            nombre: pet.nombre,
            especie: pet.especie,
            edad: pet.edad,
            descripcion: pet.descripcion,
            adoptado: pet.adoptado
          });
        }
      });
    }
  }

  savePet() {
    if (this.petForm.valid) {
      const petData: Pet = {
        id: this.isEdit ? this.data.id : 0,
        ...this.petForm.value
      };

      const request = this.isEdit
        ? this.petService.update(petData.id, petData)
        : this.petService.create(petData);

      request.subscribe(() => {
        this.toastr.success(
          this.isEdit ? 'Mascota actualizada con éxito' : 'Mascota agregada con éxito',
          'Éxito'
        );
        this.closePopup();
      });
    }
  }

  closePopup() {
    this.ref.close();
  }
}
