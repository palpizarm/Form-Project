import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  formList: number[] = [1,2,3,4];
  constructor() { }

  ngOnInit(): void {
  }

}
