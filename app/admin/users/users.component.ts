import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../sb-adminnav.css']
})
export class UsersComponent implements OnInit {

  public result = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/users/viewusers')
        .subscribe((response) => { 
            console.log('Success!', response)
            for(let i=0; response.length; i++){
              this.result.push({
                _id: response[i]._id,
                username: response[i].username,
                firstname: response[i].firstname,
                lastname: response[i].lastname,
                email: response[i].email,
                role: response[i].role
              });
            }
          },
          (error) => {console.error('Error!', error)}
        );
  }

  userDel(username, role){
    let deluser = username;
    if(role == "superadmin"){
      alert("superadmin can't delete!!!");
    }else{
      this.http.post<any>('http://localhost:3000/users/delete', {"username":deluser})
        .subscribe((response) => { 
          console.log('Success!', response)
         
        },
        (error) => {console.error('Error!', error)}
      );
      alert("deleted!!!");
    }
  }

  changeRole(username){
    let change = username;
    this.http.post<any>('http://localhost:3000/users/changeRole', {"username":change})
      .subscribe((response) => {
        console.log('Success!', response)
        
      },
      (error) => {console.error('Error!',error)}
    );
    alert("changed!!!");
  }
}
