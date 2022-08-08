// import { Role } from './../home/service/users.service';
import { Injectable, HostListener } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";

export enum userRole {
  administrator = 'administrator',
  manager       = 'manager',
  viewer        = 'viewer'
};

@Injectable()
export class UserService {
  isUserLogged: Subject<boolean> = new Subject();

  constructor(private http: HttpClient, private router: Router) { }

  //myurl = this.api + 'users';
  userRegistration(body: any): Observable<any> {
    return this.http.post('/api/users', body);
  }

  loginUser(body: any): Observable<any> {
    return this.http.post('/api/users/login', body);
  }

  ping(): Observable<any> {
    return this.http.get('/api/tools/ping');
  }

  isRunning = false;
  timeout: Date = new Date;
  resetSessionTimer() {
    this.timeout = new Date();
    this.timeout.setMinutes(this.timeout.getMinutes() + 30);

    if (!this.isRunning) {
      this.isRunning = true;
      this.sessionTimer(60 * 1000);  // make 1 minute interval
    }
  }

  private sessionTimer(timeoutAtMilliseconds = 1000) {
    setTimeout(() => {
      if (this.timeout > new Date()) {
        this.sessionTimer(timeoutAtMilliseconds);
      } else {
        // Session timed out
        this.logoutUser();
        this.isRunning = false;
      }
    }, timeoutAtMilliseconds);
  }

  logoutUser(): void {
    this.isUserLogged.next(false);
    this.clear();
    setTimeout(() => {
      this.router.navigate(['login']);
      this.isUserLogged.next(false);
    }, 1000)
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token') || '{}');
  }

  setToken(token: any) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem('token');
  }  
  
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }  
  
  clear() {
    localStorage.clear();
  }  
  
  isAuthorised() {
    return this.getToken() === null ? false : true;
  }

  // Listen to the tab/window termination
  @HostListener('window:beforeunload', ['$event'])
  //public beforeunloadHandler($event) {
  public beforeunloadHandler($event: Event) {
    $event.preventDefault();
    this.logoutUser();
      //return $event.returnValue = "Are you sure?"; // deprecated
    return true;
  }

}
