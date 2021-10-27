import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form.model';
import { FormsService } from 'src/app/services/forms.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  formList: Form[];
  formSelected: Form = new Form();
  
  constructor(private formService: FormsService) { 
    this.loadData();
  }

  ngOnInit(): void {
  }


  removeForm(id:string){
    Swal.fire({
      type: 'info',
      title: 'Cargando',
      text: 'Recuperando  datos'
    });
    Swal.showLoading();
    this.formService.delete(id)
      .subscribe((data:any) => {
        Swal.close();
        if (data.code >= 0) {
          Swal.fire({
            type: 'info',
            title: 'Confirmación',
            text: data.msg
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


  loadData() {
    Swal.fire({
      type: 'info',
      title: 'Cargando',
      text: 'Recuperando  datos'
    });
    Swal.showLoading();
    this.formService.getFormsBySender(localStorage.getItem('user'))
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

  openModalForm(index:number) {
    this.formSelected = this.formList[index];
  }

}
