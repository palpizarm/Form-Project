import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service verify if user is activate
 */
export class UtilService {

  // check if user is loged
  private isUserLoged = new Subject<Boolean>();
  public isLoginEmitter = this.isUserLoged.asObservable();

  // check type user loged
  private isAdminLoged = new Subject<Boolean>();
  public isAdminEmitter = this.isAdminLoged.asObservable();

  constructor() { }

  // is login emitter
  isLogedEmitChange(isLoged : boolean) {
    this.isUserLoged.next(isLoged);
  }

  // is admin emitter
  isAdminEmitChange(isAdmin : boolean) {
    this.isAdminLoged.next(isAdmin);
  }

}
