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
  SERVICE: GET ALL FORMS
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
  SERVICE: CREATE FORM
  Description: Service to create new form 
  Route used: METHOD: POST router.post('/') from API-REST/routes/FormR.js
  */
  create(sender:String,title:String,questions:String[],answers:String[]){
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
  SERVICE: GET REVIEW FORMS BY USER
  Description: Service to get all to review forms by user 
  Route used: METHOD: GET router.get('/toReview/:receiver') from API-REST/routes/FormR.js
  */
  getFormsReviewByUser(receiver:String){
    
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


  /*
  SERVICE: GET FORMS BY SENDER
  Description: Service to get all forms by sender 
  Route used: METHOD: GET router.get('/:sender') from API-REST/routes/FormR.js
  */

  getFormsBySender(sender:String){
    var settings = {
      "url": `${this.url}form/${sender}`,
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
  SERVICE: APPROVE FORMS 
  Description: Service to approve form
  Route used: METHOD: PATCH router.patch('/approve') from API-REST/routes/FormR.js
  */

  approveForm(receiver: String, id:String){
    var data = {
      "receiver" : receiver,
      "id" : id
    }
    var settings = {
      "url":  `${this.url}form/approve`,
      "method": "PATCH",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data)
    };
    
    return from(
      $.ajax(settings).done()
      )

  }

 /*
  SERVICE: REJECT FORMS 
  Description: Service to reject form
  Route used: METHOD: PATCH router.patch('/reject') from API-REST/routes/FormR.js
  */
  rejectForm(receiver: String, id:String){
    var data={
      "receiver" : receiver,
      "id" : id
    }

    var settings = {
      "url": `${this.url}form/reject`,
      "method": "PATCH",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
    };
    
    return from(
      $.ajax(settings).done()
    
    )

  }


  /*
  SERVICE: DELETE FORM BY ID
  Description: Service to delete form by id
  Route used: METHOD: DELETE router.delete('/deleteId') from API-REST/routes/FormR.js
  */
 delete(deleteId:String){
    var data = {
      "id" : deleteId
    }
    var settings = {
      "url": `${this.url}form/deleteId`,
      "method": "DELETE",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data)
    };
    
    return from(
      $.ajax(settings).done()
    )

 }

}
