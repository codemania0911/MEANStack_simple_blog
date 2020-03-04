import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public result = [];
  constructor( private http: HttpClient) { }

  
  ngOnInit() {
    this.http.post<any>('http://localhost:3000/posts/blog', {"data":"request"})
      .subscribe((response) => { 
          console.log('Success!', response)
          for(let i=0; response.length; i++){
            this.result.push({
              title: response[i].title,
              author: response[i].author,
              postdate: response[i].postdate,
              image: response[i].image,
              content: response[i].content,
              status: response[i].status,
              tag: response[i].tag
            });
          }
        },
        (error) => {console.error('Error!', error)}
      );
  }

}
