import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  adminUser : Boolean = true;
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('userType') == 'usuario') {
      this.adminUser = false;
    } else {
      this.adminUser = true;
    }
  }

}
