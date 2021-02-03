import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Detail } from './../user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.loggedIn());
  baseUrl = 'http://localhost:3000/api/details';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  details: Detail[];
  loginData = {email : '', password : ''};
  private profileObs$: BehaviorSubject<Profile> = new BehaviorSubject({email : '', password : ''});
  constructor(private httpClient: HttpClient, public router: Router) { }

  getProfileObs(): Observable<Profile> {
    return this.profileObs$.asObservable();
  }

  setProfileObs(profile: Profile) {
    this.profileObs$.next(profile);
  }

  getAllDetails()
  {
    return this.httpClient.get<any>(this.baseUrl);
  }

  getDetails(id)
  {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  create(newDetail : data)
  {
    //console.log(newDetail);
    return this.httpClient.post<any>(this.baseUrl, newDetail)
    .pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse)  {
    return throwError(error);
  }

  /*
  update(id, data)
  {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, data);
  }

  delete(id)
  {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }

  deleteAll()
  {
    return this.httpClient.delete<any>(this.baseUrl);
  }
  
  findByUserEmail(email)
  {
    return this.httpClient.get<any>(`${this.baseUrl}?email=${email}`);
  }*/


  login(newDetail : data) {
    this.isLoginSubject.next(true);
    return this.httpClient.post<any>(`${this.baseUrl}/login`, newDetail)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.isLoginSubject.asObservable();
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
    this.router.navigate(['/Login']);
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
