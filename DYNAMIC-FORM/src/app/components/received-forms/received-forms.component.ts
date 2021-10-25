import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form.model';
import { FormsService } from 'src/app/services/forms.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-received-forms',
  templateUrl: './received-forms.component.html',
  styleUrls: ['./received-forms.component.css']
})
export class ReceivedFormsComponent implements OnInit {

  formList: Form[];
  formSelected: Form = new Form();

  constructor(private formService: FormsService) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  openModalForm(index) {
    this.formSelected = this.formList[index];
  }

  markResponse(response: number) {
    Swal.fire({
      type: 'info',
      title: 'Cargando',
      text: 'Guardando respuesta'
    });
    Swal.showLoading();
    if (response == 1) {
      this.formService.rejectForm(localStorage.getItem('user'), this.formSelected._id)
        .subscribe((data: any) => {
          Swal.close();
          if (data.code >= 0) {
            Swal.fire({
              type: 'info',
              title: 'Información',
              text: 'Respuesta guardada'
            });
            this.loadData();
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: data.msg
            });
          }
        })
    } else if (response == 2) {
      this.formService.approveForm(localStorage.getItem('user'), this.formSelected._id)
        .subscribe((data: any) => {
          Swal.close();
          if (data.code >= 0) {
            Swal.fire({
              type: 'info',
              title: 'Información',
              text: 'Respuesta guardada'
            });
            this.loadData();
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

  loadData() {
    Swal.fire({
      type: 'info',
      title: 'Cargando',
      text: 'Recuperando  datos'
    });
    Swal.showLoading();
    this.formService.getFormsReviewByUser(localStorage.getItem('user'))
      .subscribe((data: any) => {
        Swal.close();
        if (data.code >= 0) {
          this.formList = data.data;
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
