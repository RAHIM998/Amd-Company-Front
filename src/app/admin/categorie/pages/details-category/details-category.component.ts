import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/models/Category/category';
import { CategoryServiceService } from 'src/app/shared/services/CategoryService/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.css']
})
export class DetailsCategoryComponent implements OnInit{

  id: number | null = null;
  category: Category | null = null;
  error: string | null = null;

  constructor(
    private categoryService: CategoryServiceService, 
    private route: ActivatedRoute,
    private router : Router
  ){}


  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.categoryService.getCategoryById(this.id).subscribe(
        (response) => {
          if (response.success) {          
            this.category = response.data;            
          } else {
            console.error('Erreur :', response.message);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données', error);
        }
      );
    }
  }


  editCategory(): void {
    if (this.id) {
      this.router.navigate(['/admin/update-category/', this.id]);
    }
  }

  deleteCategory(): void {
    if (this.id) {
      this.categoryService.DeleteCategory(this.id).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Catégorie supprimée !',
            text: 'La catégorie a été supprimée avec succès!',
            timer: 2000,
            showConfirmButton: false
          });
          console.log('Catégorie supprimée avec succès !', response);
          this.router.navigate(['/admin/categorie']);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie:', error);
        }
      );
    }
  }
  

}
