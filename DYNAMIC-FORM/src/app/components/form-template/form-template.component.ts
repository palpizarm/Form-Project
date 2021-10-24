import { Component, OnInit } from '@angular/core';
import { TemplateItem } from 'src/app/models/template-item.model';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {
  title : String = "";
  templateItems: TemplateItem[] = [];
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  addQuestion(index) {
    this.templateItems.splice(index,0,new TemplateItem());
  }

  removeQuestion(index) {
    this.templateItems.splice(index,1);
  }

}
