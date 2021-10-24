import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  rememberUser: boolean = false;

  constructor(private router : Router, private userService : UsersService) {

  }

  ngOnInit(): void {
  }



  login(form: NgForm) {
    if (form.invalid) { return; }
    this.addUserName();
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
    })
    Swal.showLoading();
    this.userService.login(this.user.username,this.user.password).subscribe((data:any) => {
      Swal.close();
      if (data.code >= 0){
        localStorage.setItem('user', data.data.user);
        localStorage.setItem('userType', data.data.type);
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire({
          type: 'error',
          title: 'Error al autenticar',
          text: data.msg
        });
      }
    })

  }


  addUserName() {
    if ( this.rememberUser) {
      localStorage.setItem('username', this.user.username);
    } else {
      localStorage.removeItem('username');
    }
  }

}
