import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userLogin: FormGroup;

  constructor( private fb: FormBuilder, private http: HttpClient, private _router: Router) { }

  ngOnInit() {

    this.userLogin = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  public userToken;

  onSubmit() {
    this.http.post<any>('http://localhost:3000/users/login', this.userLogin.value)
      .subscribe((response) => { 
          this.userToken = response;
          localStorage.setItem('token', response.token)
            if(response.token){
              console.log("xxxxxxxxxxxxxx")
              this._router.navigate(['admin']);
            }else{
              this._router.navigate(['index']);
              alert(response.error);
            }
          },
        (error) => {console.error('Error!', error)}
      );
  }    
}
