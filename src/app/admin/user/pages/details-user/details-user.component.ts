import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/shared/models/Users/users';
import { UserServiceService } from 'src/app/shared/services/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit{
  
  id: number | null = null;
  user: Users | null = null;
  error: string | null = null;

  constructor(
    private userService: UserServiceService, 
    private router: Router,
    private route: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if(this.id){
      this.userService.getUserById(this.id).subscribe(
        (response)=>{
          this.user = response.data;
        },
        (error)=>{
          this.error = 'Erreur lors de la récupération des détails de l\'utilisateur.';
        }
      )
    }
  }


  editUser(): void {
    if (this.id) {
      this.router.navigate(['/admin/user/updateUser', this.id]);
    }
  }

  deleteUser(): void {
    if (this.id) {
      this.userService.deleteUser(this.id).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Utilisateur supprimée !',
            text: 'L\'utilisateur a été supprimée avec succès!',
            timer: 2000,
            showConfirmButton: false
          });
          console.log('Utilisateur supprimée avec succès !', response);
          this.router.navigate(['/admin/user']);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
      );
    }
  }
  
}
