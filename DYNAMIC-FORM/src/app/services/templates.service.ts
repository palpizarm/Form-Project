import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  private url = "http://localhost:3000/";
  constructor() { }
  /*
  SERVICE: CREATE TEMPLATE
  Description: Service to create new template
  Route used: METHOD: POST router.post('/create') from API-REST/routes/TemplateRoute.js
  */
  create(title:String,questions:[String],type:[String],obligatory:[Boolean],values:[String[]]){
    var data ={
      "title" : title,
      "questions" : questions,
      "type" : type,
      "obligatory" : obligatory,
      "values" : values
    } 
    
    var settings = {
      "url": `${this.url}template/create`,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data" : JSON.stringify(data),
    };
    return from(
      $.ajax(settings).done()
    )
  }
 /*
  SERVICE: GET ALL TEMPLATES
  Description: Service to get all form templates into collection
  Route used: METHOD: GET router.get('/') from API-REST/routes/TemplateRoute.js
  */
  getTemplates(){
    var settings = {
      "url": `${this.url}template/`,
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
