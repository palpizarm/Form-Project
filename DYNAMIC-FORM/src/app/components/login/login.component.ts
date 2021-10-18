import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  rememberUser: boolean = false;

  constructor(private router : Router) {

  }

  ngOnInit(): void {
  }



  login(form: NgForm) {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
    })
    Swal.showLoading();
  
        Swal.fire({
          type: 'error',
          title: 'Error al autenticar',
          text: 'msg'
        });
  }


  addEmail() {
    if ( this.rememberUser ) {
      localStorage.setItem('email', 'test');
    } else {
      localStorage.removeItem('email');
    }
  }

}
