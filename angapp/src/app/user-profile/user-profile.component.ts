import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { Detail } from './../user'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router ) { }

  ngOnInit() {
    this.authservice.getAllDetails()
    .subscribe(
      res => this.authservice.details =res as Detail[],
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/Login'])
          }
        }
      }
    )
  }

}
