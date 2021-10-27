import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = '';
  constructor(private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
