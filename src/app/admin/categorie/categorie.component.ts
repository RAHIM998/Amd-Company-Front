import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/Category/category';
import { CategoryServiceService } from 'src/app/shared/services/CategoryService/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit{

  Category: Category [] = [];

  constructor(
    private categorieService: CategoryServiceService,

  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  //Méthode de recupération des catégories
  getCategories(): void {
    this.categorieService.getCategories().subscribe(
      (categories) => {
        this.Category = categories.data;
      },(error) => {
        console.error(error);
      }
    );
  }

  //Méthode de suppression des catégories 
  DeleteCategory(id: any) {
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
        this.categorieService.DeleteCategory(id).subscribe(
          (response) => { 
            Swal.fire({
              title: 'Supprimé!',
              text: "Le burger a été supprimé avec succès.",
              icon: 'success',
              confirmButtonColor: '#007BFF' 
            });
            this.getCategories();
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
