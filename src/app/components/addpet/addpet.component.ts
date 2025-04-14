// src./app/componenets/addpet/addpet.componnet.ts
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from '../../models/pets';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { addPet, getPet, updatePet } from '../../store/Pet.Action';
import { selectPet } from '../../store/Pet.Selector';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';


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
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()]
})
export class AddPetComponent implements OnInit, OnDestroy {
  title = 'Agregar Mascota';
  isEdit = false;
  dialogdata: any;
  petForm: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private ref: MatDialogRef<AddPetComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.petForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      especie: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      imagen: new FormControl(''),
      adoptado: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.dialogdata = this.data;
    console.log('Dialog Data:', this.dialogdata);

    if (this.dialogdata?.id && this.dialogdata.id !== 0) {
      this.title = 'Editar Mascota';
      this.isEdit = true;

      this.store.dispatch(getPet({ petId: this.dialogdata.id }));

      this.subscription.add(
        this.store.select(selectPet).subscribe((item) => {
          if (item) {
            this.petForm.setValue({
              nombre: item.nombre,
              especie: item.especie,
              edad: item.edad.toString(),
              descripcion: item.descripcion,
              imagen: item.imagen,
              adoptado: item.adoptado
            });
          }
        })
      );
    } else {
      console.log('No ID passed for editing, or adding a new pet.');
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  savePet(): void {
    if (this.petForm.valid) {
      let formValue = this.petForm.value;

      // Convertir edad a número si tiene valor
      if (formValue.edad) {
        formValue.edad = Number(formValue.edad);
      }

      // Eliminar campos vacíos (null, '', undefined)
      Object.keys(formValue).forEach(key => {
        const value = formValue[key];
        if (
          value === null ||
          value === undefined ||
          (typeof value === 'string' && value.trim() === '')
        ) {
          delete formValue[key];
        }
      });

      // Agregar el ID
      const petData: Pet = {
        ...formValue,
        id: this.isEdit ? this.dialogdata.id : 0
      };

      console.log('Enviando a backend:', petData);

      // Lógica según si es edición o nuevo
      if (this.isEdit) {
        this.store.dispatch(updatePet({ data: petData }));
        this.toastr.success('Mascota actualizada correctamente.');
      } else {
        this.store.dispatch(addPet({ data: petData }));
        this.toastr.success('Mascota agregada correctamente.');
      }

      this.closePopup();
    } else {
      this.toastr.error('Por favor, complete todos los campos requeridos.');
    }
  }


  closePopup(): void {
    this.ref.close();
  }
}
