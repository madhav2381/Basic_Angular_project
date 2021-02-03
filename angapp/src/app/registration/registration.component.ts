import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { Detail } from './../user'
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AuthService]
})
export class RegistrationComponent implements OnInit {
  
  userModel = new Detail('','','',null,'');
  submitted = false;
  errorMsg = '';

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  resetForm()
  {
    this.userModel = {
      _id: "",
      username: "",
      email: "",
      phone: null,
      password: ""
    }
  }

  onSubmit(userform)
  {
    console.log('hi '+this.userModel.username);
    console.log(userform);

    const data = {
      username : this.userModel.username,
      email : this.userModel.email,
      phone : this.userModel.phone,
      password : this.userModel.password
    };


    

    this.authService.create(data).subscribe(
      response => {
        console.log("Submitted");
        this.submitted = true;
        localStorage.setItem('token', response.token)
        this.router.navigate(['/Login'])
      },
      error => this.errorMsg = error.statusText
    );
    
  }

}

