import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import $ from 'jquery';
import { toUnicode } from 'punycode';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "http://localhost:3000/";
  constructor() { }
  /*
  SERVICE: CREATE USER
  Description: Service to create new user
  Route used: METHOD: POST router.post('/') from API-REST/routes/UserRoute.js
  */
  create(user: String,password: String,typeUser:String){
    var data = {
      "user" : user,
      "password": password,
      "typeUser": typeUser
    }   
    var settings = {
      "url": `${this.url}users/`,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": data
      
    };
    
    return from(
      $.ajax(settings).done()
    )

  }

  /*
  SERVICE: LOGIN
  Description: Service to do login
  Route used: METHOD: POST router.post('/login') from API-REST/routes/UserRoute.js
  */
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
      $.ajax(settings).done()
      )
  }
 
  /*
  SERVICE: GET USERS
  Description: Service to get all existing users 
  Route used: METHOD: GET router.get('/') from API-REST/routes/UserRoute.js
  */
  getUsers() {
    var settings = {
      "url": `${this.url}users/`,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    return from(
      $.ajax(settings).done() 
      )

  }

  /*
  SERVICE: DELETE USERS
  Description: Service to delete user by Id 
  Route used: METHOD: DELETE router.delete('/:userId/:sender') from API-REST/routes/UserRoute.js
  */
  deleteUserById(userId:String,user:String){
    var settings = {
      "url": `${this.url}users/${userId}/${user}`,
      "method": "DELETE",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return from(
      $.ajax(settings).done()
    )
  }


}
