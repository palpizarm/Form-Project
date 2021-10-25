import { Component, OnInit } from '@angular/core';
import { TemplateItem } from 'src/app/models/template-item.model';
import { TemplatesService } from 'src/app/services/templates.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {
  title: String = "";
  templateItems: TemplateItem[] = [];

  constructor(private templateService: TemplatesService) {
  }

  ngOnInit(): void {
  }

  addQuestion(index) {
    this.templateItems.splice(index + 1, 0, new TemplateItem());
    this.templateItems[index].type="text";
  }

  removeQuestion(index) {
    this.templateItems.splice(index, 1);
  }

  saveTemplate() {
    console.log(this.title);
    console.log(this.templateItems);
    if (this.title == '') {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'El formulario no se puede guardar sin titulo. Por favor, agregue uno'
      });
      return;
    }
    if (this.templateItems.length == 0) {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'El formulario debe tener al menos una pregunta'
      });
      return;
    }
    if (this.validateQuestion() == false) return;
    debugger;
    var questions: [String] = [''];
    questions.splice(0,1);
    var types: [String] = [''];
    types.splice(0,1);
    var obligatories: [Boolean] = [true];
    obligatories.splice(0,1);
    var values: [String[]] = [['']];
    values.splice(0,1);
    this.templateItems.forEach((element: TemplateItem) => {
      questions.push(element.question);
      types.push(element.type);
      obligatories.push(element.obligatory);
      values.push(element.values);
    })
    Swal.fire({
      type: 'info',
      title: 'Cargango',
      text: 'Guardando plantilla'
    });
    Swal.showLoading();
    
    this.templateService.create(this.title, questions, types, obligatories, values)
      .subscribe((data: any) => {
        Swal.close();
        if (data.code >= 0) {
          Swal.fire({
            type: 'info',
            title: 'Información',
            text: data.msg
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Error al guardar la plantilla',
            text: data.msg
          });
        }
      })
  }


  validateQuestion(): Boolean {
    this.templateItems.forEach((element: TemplateItem) => {
      if (element.question == '') {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'Todas los campos de pregunta deben estar llenos'
        });
        return false;
      }
      if (element.type == 'select' && element.values.length == 0) {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'Las preguntas tipo lista de selección deben tener valores defindos'
        });
        return false;
      }
    });

    return true;
  }
}
