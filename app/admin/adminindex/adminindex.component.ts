import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminindex',
  templateUrl: './adminindex.component.html',
  styleUrls: ['../sb-adminnav.css']
})
export class AdminindexComponent implements OnInit {

  adminEvents = [];
  constructor( private _router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/users/profile')
    .subscribe(
      res => this.adminEvents = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['index'])
          }
        }
      }
    )
  }

}
