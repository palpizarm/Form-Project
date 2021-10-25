import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLogedGuard implements CanActivate {
  
  constructor(private router : Router){};
  
  canActivate() {
    if (localStorage.getItem('userType')) {
      const type = String(localStorage.getItem('userType'));
      if (type == 'administrador') {
        return true;
      } 
    }
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
    return false;
  }
  
}
