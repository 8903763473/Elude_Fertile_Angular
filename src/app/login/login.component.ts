import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(public router: Router, public app: AppComponent) { }

  ngOnInit() {
    this.app.leftSide = false;
    this.app.topHeader = false;
  }

}
