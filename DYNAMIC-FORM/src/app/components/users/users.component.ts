import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList: User[] = [];
  

  constructor() { }

  ngOnInit(): void {
      // users dummy
      this.usersList.push(<User>{name:'Juan', password : 'Juan88', typeUser: 'usuario', forms: ['Vacaciones'], email: ''}) 
      this.usersList.push(<User>{name:'Juan1', password : 'Juan88', typeUser: 'usuario', forms: ['Vacaciones'], email: ''}) 
      this.usersList.push(<User>{name:'Juan2', password : 'Juan88', typeUser: 'usuario', forms: ['Vacaciones'], email: ''})   
    }



  loadData(){
    $('#users-table').DataTable();
  }



}
