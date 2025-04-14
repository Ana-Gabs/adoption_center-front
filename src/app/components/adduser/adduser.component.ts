// src/app/components/adduser/adduser.component.ts
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { addUser, getUser, updateUser } from '../../store/User.Action';
import { selectUser } from '../../store/User.Selector';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-adduser',
  standalone: true,
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class AddUserComponent implements OnInit, OnDestroy {
  title = 'Agregar Usuario';
  isEdit = false;
  dialogdata: any;
  userForm: FormGroup;
  subscription: Subscription = new Subscription();

  roles: string[] = ['Admin', 'Employee', 'Viewer'];

  constructor(
    private store: Store,
    private ref: MatDialogRef<AddUserComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      second_last_name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.dialogdata = this.data;
    console.log('Dialog Data:', this.dialogdata);

    if (this.dialogdata?.id && this.dialogdata.id !== 0) {
      this.title = 'Editar Usuario';
      this.isEdit = true;

      this.store.dispatch(getUser({ userId: this.dialogdata.id }));

      this.subscription.add(
        this.store.select(selectUser).subscribe((item) => {
          if (item) {
            this.userForm.setValue({
              username: item.username,
              email: item.email,
              first_name: item.first_name,
              last_name: item.last_name,
              second_last_name: item.second_last_name,
              role: item.role
            });
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveUser(): void {
    if (this.userForm.valid) {
      let formValue = this.userForm.value;

      // Eliminar campos vacíos
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

      const userData = {
        ...formValue,
        id: this.isEdit ? this.dialogdata.id : 0
      };

      console.log('Enviando a backend:', userData);

      if (this.isEdit) {
        this.store.dispatch(updateUser({ data: userData }));
        this.toastr.success('Usuario actualizado correctamente.');
      } else {
        this.store.dispatch(addUser({ data: userData }));
        this.toastr.success('Usuario agregado correctamente.');
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
