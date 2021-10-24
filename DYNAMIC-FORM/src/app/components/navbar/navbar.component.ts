import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  adminUser : Boolean = true;
  
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  // first remove from localStorage item of the log 
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('logDate');
    this.router.navigateByUrl('/login');
  }

}
