import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private url = "http://localhost:3000/";
  constructor() { }
  
  /*
  SERVICE: GET FORMS
  Description: Service to get all forms into collection
  Route used: METHOD: GET router.get('/') from API-REST/routes/FormR.js
  */
  getForms(){
    var settings = {
      "url": `${this.url}form/`,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      }
    };
    
    return from(
      $.ajax(settings).done()
    )
  }

 /*
  SERVICE: CREATE FORMS
  Description: Service to create new form 
  Route used: METHOD: POST router.post('/') from API-REST/routes/FormR.js
  */
  create(sender:String,title:String,questions:[String],answers:[String]){
    var data = {
      "sender" :sender,
      "title" : title,
      "questions" : questions,
      "answers" : answers
    }
    var settings = {
      "url": `${this.url}form/`,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data" : JSON.stringify(data)
    };
    return from(
      $.ajax(settings).done()
    )
  }

  /*
  SERVICE: REVIEW FORMS BY USER
  Description: Service to get all to review forms by user 
  Route used: METHOD: GET router.get('/toReview/:receiver') from API-REST/routes/FormR.js
  */
  review(receiver:String){
    
    var settings = {
      "url": `${this.url}form/toReview/${receiver}`,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      }
    };
    
    return from(
      $.ajax(settings).done()
    )
  }


}
