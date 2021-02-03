import { Component } from '@angular/core';
import {Detail} from './user'; 
import { AuthService } from './services/auth.service'
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angapp';
  isLoggedIn : Observable<boolean>;

  constructor(private authservice : AuthService){
    this.isLoggedIn = authservice.isLoggedIn();
  }
}
