import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/models/Users/users';
import { UserServiceService } from 'src/app/shared/services/UserService/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  
  users: Users[] = [];  
  id : any = 0
  
  constructor(
    private router: Router,
    private userService: UserServiceService
  ){}
  
  ngOnInit(): void {
    this.getUser(); 
  }

  //Méthode de récupération de l'utilisateur connecté 
  getUser(): void {
    this.id = localStorage.getItem('id');
    this.userService.getUser(this.id).subscribe(
      (response) => {
        this.users = [response.data]; 
        console.log(this.id)
        console.log(response.data.image); 
      },
      (error) => {
        console.log(error);
      });
  }     
}
