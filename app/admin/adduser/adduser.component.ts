import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['../sb-adminnav.css']
})
export class AdduserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      role: ['']
    })
  }

  onSubmit() {
    console.log(this.userForm.value);
    console.log(JSON.stringify(this.userForm.value));
    this.http.post<any>('http://localhost:3000/users/register', this.userForm.value)
      .subscribe((response) => { 
          console.log('Success!', response)
          alert("Success!");
        },
        (error) => {console.error('Error!', error)}
      );
  }    
}
