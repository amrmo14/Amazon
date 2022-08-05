import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 isUser: boolean = false;
  constructor(private router: Router) {
  }

 


  ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.isUser = true;
      console.log(this.isUser)
    }

  }

  logout() {
    this.router.navigate(['/login'])
    this.isUser = false
    localStorage.clear()
  }

}
