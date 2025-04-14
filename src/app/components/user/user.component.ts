// src/app/components/user/user.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from '../../models/user';
import { AddUserComponent } from '../adduser/adduser.component';

import { loadUsers, deleteUser } from '../../store/User.Action';
import { getUsersList } from '../../store/User.Selector';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    AddUserComponent,
  ]
})
export class UserComponent implements OnInit, OnDestroy {
  userList: User[] = [];
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'activo', 'action'];
  subscription = new Subscription();

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllUsers() {
    this.store.dispatch(loadUsers());
    const sub = this.store.select(getUsersList).subscribe(users => {
      if (users) {
        this.userList = users;
        this.dataSource = new MatTableDataSource(this.userList);
        console.log('Usuarios cargados desde selector:', this.userList);
      } else {
        console.log('No se cargaron usuarios o la lista está vacía');
      }
    });
    this.subscription.add(sub);
  }

  addUser() {
    this.openPopup(0);
  }

  editUser(id: number) {
    this.openPopup(id);
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.store.dispatch(deleteUser({ userId: id }));
    }
  }

  openPopup(userId: number) {
    this.dialog.open(AddUserComponent, {
      width: '50%',
      data: { id: userId },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms'
    }).afterClosed().subscribe(() => {
      this.getAllUsers();
    });
  }
}
