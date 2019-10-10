import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['../sb-adminnav.css']
})
export class AdminnavComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onSelect(){
    this.router.navigate(['admin', 'posts'] );
  }

}
