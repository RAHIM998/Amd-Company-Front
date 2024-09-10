import { Component } from '@angular/core';
import { TokenService } from './shared/services/AuthService/token.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amd Company';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    //
  }

}
