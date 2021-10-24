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
  

  constructor(private userService : UsersService) { 

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Obteniendo usuarios',
    })
    Swal.showLoading();
    userService.getUsers()
      .subscribe((data:any) => {
        Swal.close();
        console.log(data);
        if(data.code >= 0) {
          console.log(data.data);
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

  ngOnInit(): void {
      // users dummy
      this.usersList.push(<User>{username:'Juan', password : 'Juan88', typeUser: 'usuario', forms: ['Vacaciones'], email: ''}) 
      this.usersList.push(<User>{username:'Juan1', password : 'Juan88', typeUser: 'usuario', forms: ['Vacaciones'], email: ''}) 
      this.usersList.push(<User>{username:'Juan2', password : 'Juan88', typeUser: 'usuario', forms: ['Vacaciones'], email: ''})   
    }



  loadData(){
    $('#users-table').DataTable();
  }



}
