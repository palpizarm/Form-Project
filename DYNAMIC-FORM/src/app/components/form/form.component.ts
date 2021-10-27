import { Component, OnInit } from '@angular/core';
import { TemplateForm } from 'src/app/models/template.model';
import { Form } from 'src/app/models/form.model';
import { ApprovalsService } from 'src/app/services/approvals.service';

import Swal from 'sweetalert2';
import { TemplatesService } from 'src/app/services/templates.service';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  approvalRoute: String[];
  templates: TemplateForm[];
  form: Form = new Form();
  template: TemplateForm = new TemplateForm();
  templateSelected: Boolean = false;


  constructor(private approvalsService: ApprovalsService, 
    private templateService: TemplatesService,
    private formService : FormsService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('user'))
      this.approvalsService.getApprovalRoutesBySender(localStorage.getItem('user'))
        .subscribe((data: any) => {
          if (data.code >= 0) {
            this.approvalRoute = data.data;
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: data.msg
            });
          }
        })
    this.templateService.getTemplates()
      .subscribe((data: any) => {
        if (data.code >= 0) {
          this.templates = data.data;
        } else {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: data.msg
          });
        }
      })
  }


  selectForm(value: string) {
    if (value == "Seleccionar Formulario") {
      this.templateSelected = false;
      this.template = new TemplateForm();
      return;
    }
    this.templateSelected = true;
    this.templates.forEach((element: TemplateForm) => {
      if (element.title == value) {
        this.template = element;
      }
    });
    console.log(this.template);
    this.form.questions = this.template.questions;
    this.form.sender = localStorage.getItem('user');
    this.form.title = this.template.title;
    this.form.answers = Array(this.template.questions.length).fill('');



  }

  sendForm() {
    for (var index = 0; index < this.template.questions.length; index++) {
      if (this.form.answers[index] == '' && this.template.obligatory[index]) {
        Swal.fire({
          type: 'error',
          title: 'Formulario incompleto',
          text: `El campo ${index + 1 + '.' + this.form.questions[index]} es obligatoria. Ingrese un valor`
        });
        return;
      }
    }
    Swal.fire({
      type: 'info',
      title: 'Cargando',
      text: 'Guardando formulario'
    });
    Swal.showLoading();
    this.formService.create(this.form.sender,this.form.title,this.form.questions,this.form.answers)
      .subscribe((data:any) => {
        Swal.close();
        if (data.code >= 0) {
          Swal.fire({
            type: 'info',
            title: 'Exito',
            text: 'Formulario guardado'
          });
          (<HTMLSelectElement>document.getElementById('form-type')).selectedIndex = 0;
          this.selectForm('Seleccionar Formulario');
        } else {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: data.msg
          });
        }
      })
  }

}
