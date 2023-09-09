import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticated = false;

  get userIsAuthenticated(){
    return this._userIsAuthenticated;
  }

  constructor() { }

  //dummy authentication
  login(){
    this._userIsAuthenticated = true;
  }

  logout(){
    this._userIsAuthenticated = false;
  }

}
