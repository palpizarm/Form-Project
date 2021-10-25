import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLogedGuard implements CanActivate {
  
  constructor(){};
  
  canActivate() {
    if (localStorage.getItem('userType')) {
      const type = String(localStorage.getItem('userType'));
      if (type == 'administrador') {
        return true;
      } else {
        return false;
      }
    }
  }
  
}
