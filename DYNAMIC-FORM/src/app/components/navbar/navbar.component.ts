import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  adminUser: boolean = true;
  userLoged: boolean = false;

  constructor(private router: Router, private utilService: UtilService) {
    this.utilService.isLoginEmitter
      .subscribe((isLoged: boolean) => {
        this.userLoged = isLoged;
        if (!this.userLoged) {
          localStorage.removeItem('logDate');
          localStorage.removeItem('userType');
        }
      });
    this.utilService.isAdminEmitter
      .subscribe((adminLoged: boolean) => {
        this.adminUser = adminLoged;
      });

  }

  ngOnInit(): void {
  }

  // first remove from localStorage item of the log 
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('logDate');
    this.router.navigateByUrl('/login');
  }

}
