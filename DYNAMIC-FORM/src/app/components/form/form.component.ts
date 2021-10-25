import { Component, OnInit } from '@angular/core';
import { TemplateForm } from 'src/app/models/template.model';
import { Form } from 'src/app/models/form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  formOptions = ['Vacaciones', 'Cita médica'];
  form : Form = new Form();
  template : TemplateForm = new TemplateForm(); 

  constructor() {

  }

  ngOnInit(): void {
    this.template.questions = ["Q1", "Q2", "Q3", "Q4"];
    this.template.type = ['text', 'number', 'date', 'select'];
    this.template.obligatory = [true, true, true, true];
    this.template.values = [[],[],[], ['option 1','option 2','option 3']];
  }


  selectForm(value:string){
    if (value == "Seleccionar Formulario"){
      this.template.title = "";
      return;
    }
    this.template.title = value;
  }

  sendForm(){

  }

}
