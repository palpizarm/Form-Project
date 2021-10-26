import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import $ from 'jquery';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList: User[] = [];


  constructor(private userService: UsersService) {
    this.loadUsers();


  }

  ngOnInit(): void { }


  loadUsers() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Obteniendo usuarios',
    })
    Swal.showLoading();
    this.userService.getUsers()
      .subscribe((data: any) => {
        Swal.close();
        if (data.code >= 0) {
          this.usersList = data.data;
        } else {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: data.msg
          });
        }
      })
  }

  loadData() {
    $('#users-table').DataTable();
  }


  removeUser(index: number) {
    Swal.fire({
      title: 'Confirmación',
      text: 'Esta seguro que desea eliminar el usuario',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUserById(this.usersList[index]._id, this.usersList[index].username)
          .subscribe((data: any) => {
            if (data.code >= 0) {
              Swal.fire({
                title: 'Información',
                type: 'info',
                text: data.msg
              });
              this.loadData();
            } else {
              Swal.fire({
                title: 'Error',
                type: 'error',
                text: data.msg
              });
            }
          })
      }
    })
  }

}
