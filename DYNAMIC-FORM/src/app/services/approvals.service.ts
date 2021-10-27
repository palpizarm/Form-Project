import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class ApprovalsService {
  private url = "http://localhost:3000/";
  constructor() { }

  /*
  SERVICE: CREATE FORM ROUTE
  Description: Service to create new form route
  Route used: METHOD: POST router.post('/') from API-REST/routes/ApprovalRoute.js
  */
  create(sender:String, formTitle:String,receivers:String[],approvalsRequired:Number){
    var data= {
      "sender" : sender,
      "formTitle":formTitle,
      "receivers":receivers,
      "approvalsRequired" : approvalsRequired
    }
    var settings = {
      "url": `${this.url}formRoute/`,
      "method": "POST",
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
  SERVICE: GET ALL APPROVAL ROUTES
  Description: Service to get all approval routes
  Route used: METHOD: GET router.get('/') from API-REST/routes/ApprovalRoute.js
  */
  getApprovalRoutes(){
    var settings = {
      "url": `${this.url}formRoute/`,
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
  SERVICE: GET ALL APPROVAL ROUTES by sender
  Description: Service to get all existing approval routes for a specific sender
  Route used: METHOD: GET router.get('/getUser/:sender') from API-REST/routes/ApprovalRoute.js
  */
 getApprovalRoutesBySender(sender:String){
  var settings = {
    "url": `${this.url}formRoute/getUser/${sender}`,
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
  SERVICE: DELETE APPROVAL ROUTE by Id
  Description: Service to delete approval route by id
  Route used: METHOD: DELETE router.delete('/deleteId') from API-REST/routes/ApprovalRoute.js
  */

  deleteById(id:String){
    var data= {
      "id" : id
    }
    var settings = {
      "url": `${this.url}formRoute/deleteId`,
      "method": "DELETE",
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
  SERVICE: DELETE APPROVAL ROUTE BY USER AND TITLE
  Description: Service to delete approval route by user and form title
  Route used: METHOD: DELETE router.delete('/deleteUserRoute') from API-REST/routes/ApprovalRoute.js
  */
  deleteByUserAndTitle(sender:String,formTitle:String){
    var data= {
      "sender" : sender,
      "formTitle" : formTitle
    }

    var settings = {
      "url": `${this.url}formRoute/deleteUserRoute`,
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
