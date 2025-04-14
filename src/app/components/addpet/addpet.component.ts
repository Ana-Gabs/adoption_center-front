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
    MatDialogModule
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

    if (this.dialogdata.id) {
      this.title = 'Editar Mascota';
      this.isEdit = true;

      this.store.dispatch(getPet({ petId: this.dialogdata.id }));

      // Subscribe to the store to get the pet data
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
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  savePet(): void {
    if (this.petForm.valid) {
      let _data: Pet = {
        id: this.isEdit ? this.dialogdata.id : 0,
        nombre: this.petForm.value.nombre as string,
        especie: this.petForm.value.especie as string,
        edad: Number(this.petForm.value.edad),
        descripcion: this.petForm.value.descripcion as string,
        imagen: this.petForm.value.imagen as string,
        adoptado: this.petForm.value.adoptado as boolean
      };

      if (this.isEdit) {
        this.store.dispatch(updatePet({ data: _data }));
        this.toastr.success('Mascota actualizada correctamente.');
      } else {
        this.store.dispatch(addPet({ data: _data }));
        this.toastr.success('Mascota agregada correctamente.');
      }

      this.closepopup();
    } else {
      this.toastr.error('Por favor, complete todos los campos requeridos.');
    }
  }

  closepopup(): void {
    this.ref.close();
  }
}
