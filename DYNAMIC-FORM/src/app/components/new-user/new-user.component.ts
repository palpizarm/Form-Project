import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  password2: string = '';
  user: User = new User();
  constructor(private userUservice : UsersService) { }

  ngOnInit(): void {
    this.user.typeUser = 'usuario';
  }


  addUser(form: NgForm){
    if (form.invalid) { return; }
    
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Creando usuario...',
    })
    Swal.showLoading();
    this.userUservice.create(this.user.user, this.user.password, this.user.typeUser)
      .subscribe((data:any) => {
        Swal.close();
        if (data.code >= 0) {
          Swal.fire({
            type: 'info',
            title: 'Confirmación',
            text: 'Usuario creado exitosamente'
          });
          this.cleanInputs(form);
        } else {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: data.msg
          });
        }
      })
  }

  // clean inputs to create a new user from initial state
  cleanInputs(form: NgForm) {
    this.password2 = '';
    this.user.password = '';
    (<HTMLInputElement>document.getElementById('user-type')).value = 'usuario';
    this.user.typeUser = 'usuario';
    this.user.user = '';
    form.resetForm();
  }

}
