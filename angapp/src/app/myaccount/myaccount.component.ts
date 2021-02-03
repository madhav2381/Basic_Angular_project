import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Detail } from './../user';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {


  constructor(private authservice : AuthService) {
    this.authservice.getProfileObs().subscribe(profile =>
    this.loginData = profile);
   }

  ngOnInit() {
  }

  loginData = {email : '', password : ''};
  

}
