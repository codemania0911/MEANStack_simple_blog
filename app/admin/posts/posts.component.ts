import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['../sb-adminnav.css']
})
export class PostsComponent implements OnInit {

  public result = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get<any>('http://localhost:3000/posts/viewposts')
        .subscribe((response) => { 
            console.log('Success!', response);
            for(let i=0; i < response.length; i++){
              this.result.push({
                _id: response[i]._id,
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
          (error) => {console.error('Error!', error);}
        );
  }

  postDel(author){
    let delauthor = author;
    this.http.post<any>('http://localhost:3000/posts/delete', {"author":delauthor})
    .subscribe((response) => { 
      console.log('Success!', response);
    },
    (error) => {console.error('Error!', error);}
    );
  }

  publish(author){
    let publishauthor = author;
    this.http.post<any>('http://localhost:3000/posts/published', {"author":publishauthor})
    .subscribe((response) => { 
      console.log('Success!', response)
    },
      (error) => {console.error('Error!', error);}
    );
  }
}
