import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(private router : Router) {};
  
  canActivate(): boolean {
    if (localStorage.getItem('logDate')) {
      const date = Number(localStorage.getItem('logDate'));
      const time = new Date();
      time.setTime(date + 15*60000);
      
      if (time > new Date()) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }
    this.router.navigateByUrl('/login');
    return false;
  }
  
}
