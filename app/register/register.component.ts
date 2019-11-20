import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  constructor( private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      password: ['']
    })
  }
  
  onSubmit() {
    console.log(JSON.stringify(this.userForm.value));
    this.http.post<any>('http://localhost:3000/users/register', this.userForm.value)
      .subscribe((response) => { 
          console.log('Success!', response) 
        },
        (error) => {console.error('Error!', error)}
      );
  }    
}
