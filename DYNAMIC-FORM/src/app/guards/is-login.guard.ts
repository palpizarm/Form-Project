import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(private router : Router, private utilService : UtilService) {};
  
  canActivate(): boolean {
    if (localStorage.getItem('logDate')) {
      const date = Number(localStorage.getItem('logDate'));
      const time = new Date();
      time.setTime(date + 15*60000);
      
      if (time > new Date()) {
        this.utilService.isLogedEmitChange(true);
        return true;
      }
    }
    this.utilService.isLogedEmitChange(false);
    this.router.navigateByUrl('/login');
    return false;
  }
  
}
