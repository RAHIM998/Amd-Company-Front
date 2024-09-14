import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/Users/users';
import { UserServiceService } from 'src/app/shared/services/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  id : any = 0
  users: Users[] = []; 
  
  constructor(private userService: UserServiceService){}

  ngOnInit(): void {
    this.getTabUsers();
  }


  //Récupération de la liste des utilisateurs 
  getTabUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  //Suppression d'utilisateur
  DelUser(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007BFF',  
      cancelButtonColor: '#d33',  
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
      background: '#f0f0f0', 
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (response) => { 
            Swal.fire({
              title: 'Supprimé!',
              text: "L'utilisateur a été supprimé.",
              icon: 'success',
              confirmButtonColor: '#007BFF' 
            });
            this.getTabUsers();
          },
          (error) => {
            Swal.fire({
              title: 'Erreur!',
              text: "Une erreur est survenue.",
              icon: 'error',
              confirmButtonColor: '#007BFF'  
            });
            console.log(error);
          }
        )
      }
    });
  }


}
