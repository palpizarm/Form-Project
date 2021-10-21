import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:3000";

  constructor() { }

  login(user:string, password:string) {
    var data = {
      "user" : user,
      "password" : password
    }
    var settings = {
      "url": `${this.url}users/login`,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": data
    };
    return from(
      $.ajax(settings).done(function (response) {
      console.log(response);
    }));
  }
}
