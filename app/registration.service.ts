import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/authentication.service';

@Injectable()
export class RegistrationService {
  
  _url = 'http://localhost:3000/register';
  _url_access = 'http://localhost:3000/users/access';

  constructor(private _http: HttpClient) { }

  
  register(userData) {
    return this._http.post<any>(this._url, userData);
  }

  
  loggedIn(){
    this._http.get<any>(this._url_access).subscribe ((response) => {
      
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      },
      (error) => {
        return false
      }
    );
    return false
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
