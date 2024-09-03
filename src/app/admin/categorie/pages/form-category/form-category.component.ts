import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/shared/services/CategoryService/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit{

  CategoryForm: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryServiceService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.CategoryForm = this.fb.group({
      libelle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });
  }


  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.categoryService.getCategoryById(this.id).subscribe(
        (response) => {
          if (response.success) {          
            this.CategoryForm.get('libelle')?.setValue(response.data.libelle);
          }
        },(error) => {
          console.error('Erreur lors de la récupération des données', error);
        }
      );
    }
  }

  //Méthode d'ajout des catégories
  addCategory(): void {
    if (this.CategoryForm.valid) {
      const categoryData = {
        libelle: this.CategoryForm.get('libelle')?.value,
      };
      
      if (this.id) {
        this.categoryService.updateCategory(categoryData, this.id).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Catégorie modifiée!',
              text: 'La catégorie a été modifiée avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            this.router.navigate(['/admin/categorie']);
          },
          (error) => {
            console.error('Erreur lors de la modification de la catégorie:', error);
          }
        );
      } else {
        this.categoryService.addCategory(categoryData).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Catégorie ajoutée',
              text: 'La catégorie a été ajoutée avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            this.router.navigate(['/admin/categorie']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la catégorie:', error);
          }
        );
      }
    } else {
      console.log('Formulaire invalide:', this.CategoryForm.errors);
    }
  }
  

}
