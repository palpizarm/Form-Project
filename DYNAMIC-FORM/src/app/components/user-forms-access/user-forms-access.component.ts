import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprovalRoute } from 'src/app/models/approvalRoute.model';
import { TemplateForm } from 'src/app/models/template.model';
import { ApprovalsService } from 'src/app/services/approvals.service';
import { TemplatesService } from 'src/app/services/templates.service';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-forms-access',
  templateUrl: './user-forms-access.component.html',
  styleUrls: ['./user-forms-access.component.css']
})
export class UserFormsAccessComponent implements OnInit {

  formAccess: ApprovalRoute[] = [];
  user: string = '';
  allUsers: String[] = [];
  newRoute : ApprovalRoute = new ApprovalRoute();
  formsNames : String[] = [];
  usersSelect : String[] = [];

  constructor(private actRoute: ActivatedRoute, 
    private approvalService: ApprovalsService, 
    private userService: UsersService,
    private templateService : TemplatesService) {
    this.actRoute.params
      .subscribe(params => {
        this.user = params.user;
        this.loadForms();
      })
  }

  ngOnInit(): void {
  }


  loadUsers() {
    this.allUsers = Array(0);
    this.userService.getUsers()
    .subscribe((data: any) => {
      if (data.code >= 0) {
        let users = data.data;
        users.forEach((element) => {
          if ((element.user != this.user)) {
            this.allUsers.push(element.user);
          }
        })
      }
    })
  }

  loadTemplates() {
    this.formsNames = Array(0);
    this.templateService.getTemplates()
    .subscribe((data:any) => {
      if (data.code >= 0) {
        let templates : TemplateForm[] = data.data;
        templates.forEach((element:TemplateForm) => {
          if(!(this.formAccess.some( e => e.formTitle == element.title))) {
            this.formsNames.push(element.title);
          }
        })
      }
    })
  }

  loadForms() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Cargando rutas',
    })
    Swal.showLoading();
    this.approvalService.getApprovalRoutesBySender(this.user)
      .subscribe((data: any) => {
        Swal.close();
        if (data.code >= 0) {
          this.formAccess = data.data;
        } else {
          Swal.fire({
            title: 'Error',
            type: 'error',
            text: data.msg
          });
        }
      })
  }

  removeForm(index) {
    Swal.fire({
      title: 'Confirmación',
      text: 'Esta seguro que desea eliminar el acceso al formulario',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.approvalService.deleteById(this.formAccess[index]._id)
          .subscribe((data: any) => {
            console.log(data)
            if (data.code >= 0) {
              Swal.fire({
                title: 'Información',
                type: 'info',
                text: 'Formulario eliminado'
              });
              this.loadForms();
            } else {
              Swal.fire({
                title: 'Error',
                type: 'error',
                text: data.msg
              });
            }
          })
      }
    })
  }

  createApprovalRoute() {

  }

  userRouteAdd(user:string) {
    this.newRoute.receivers.push(user);
    this.usersSelect.splice(this.usersSelect.indexOf(user),1);
    var e = (document.getElementById("user-route-select")) as HTMLSelectElement;
    e.value="0"
  }

  userRouteRemove(index:number,user:string) {
    this.newRoute.receivers.splice(index,1);
    this.usersSelect.push(user);
  }

  newFormAccess() {
    this.newRoute = new ApprovalRoute();
    this.loadTemplates();
    this.loadUsers();
    this.usersSelect = this.allUsers;
    this.newRoute.sender = this.user;
  }

  addUserToNewForm(){
    if (this.newRoute.formTitle.length == 0) {
      Swal.fire({
        title: 'Error',
        type: 'error',
        text: 'Seleccione un formulario'
      });
      return;
    }
    if (this.newRoute.receivers.length == 0) {
      Swal.fire({
        title: 'Error',
        type: 'error',
        text: 'Debe seleccionar al menos un usuario en la seleccion de "enviar a"'
      });
      return;
    }

    this.approvalService.create(this.newRoute.sender,
      this.newRoute.formTitle,this.newRoute.receivers,this.newRoute.approvalsRequired)
      .subscribe((data:any) => {
        if (data.code >= 0) {
          this.loadForms();
          var e = (document.getElementById("close-modal")) as HTMLButtonElement;
          e.click();
          
        } else {
          Swal.fire({
            title: 'Error',
            type: 'error',
            text: data.msg
          });
        }
      })
  }

}
