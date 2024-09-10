import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/shared/services/CategoryService/category-service.service';
import { ProduitServiceService } from 'src/app/shared/services/ProduitService/produit-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-produit',
  templateUrl: './form-produit.component.html',
  styleUrls: ['./form-produit.component.css']
})
export class FormProduitComponent implements OnInit {

  productForm: FormGroup;
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  fileNames: string[] = [];
  categories: any[] = [];
  id: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitServiceService,
    private categoryService: CategoryServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      category_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      libelle: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(/^[\p{L}0-9\s]+$/u)]],
      prix: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stock: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+$/)]],
      description: ['', [Validators.maxLength(1000)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
  
    if (this.id) {
      this.isEditMode = true;
      this.produitService.getProduitById(this.id).subscribe(
        (response) => {
          if (response.success) {
            const productData = response.data;
            this.productForm.patchValue({
              category_id: productData.category?.id,
              libelle: productData.libelle,
              prix: productData.prix,
              stock: productData.stock,
              description: productData.description
            });
          } else {
            console.error('Erreur :', response.message);
          }
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des données', error);
        }
      );
    }
  
    this.loadCategories();
  }
  
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    );
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        this.selectedFiles.push(file);
        this.fileNames.push(file.name);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    this.previewChanges(); 
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('category_id', this.productForm.get('category_id')?.value || '');
      formData.append('libelle', this.productForm.get('libelle')?.value || '');
      formData.append('prix', this.productForm.get('prix')?.value || '');
      formData.append('stock', this.productForm.get('stock')?.value || '');
      formData.append('description', this.productForm.get('description')?.value || '');
  
      // Ajouter les fichiers sélectionnés
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('image[]', this.selectedFiles[i]);
      }
  
      console.log('FormData envoyé:', formData);
  
      // Envoyer les données au backend
      if (this.id) {
        this.produitService.updateProduit(this.id, formData).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Produit modifié !',
              text: 'Le produit a été modifié avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            console.log('Produit modifié avec succès', response);
            this.router.navigate(['/admin/produit']);
          },
          error => {
            console.error('Erreur lors de la modification du produit', error);
            if (error.error) {
              console.log('Erreur détaillée:', error.error);
            }
          }
        );
      } else {
        this.produitService.addProduit(formData).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Produit ajouté',
              text: 'Le produit a été ajouté avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            console.log('Produit créé avec succès', response);
            this.router.navigate(['/admin/produit']);
          },
          error => {
            console.error('Erreur lors de la création du produit', error);
          }
        );
      }
    } else {
      console.log('Formulaire invalide:', this.productForm.errors);
    }
  }

  previewChanges() {
    // Crée un objet avec les données du formulaire
    const previewData = {
      category_id: this.productForm.get('category_id')?.value,
      libelle: this.productForm.get('libelle')?.value,
      prix: this.productForm.get('prix')?.value,
      stock: this.productForm.get('stock')?.value,
      description: this.productForm.get('description')?.value,
    };

    // Affiche les données dans la console du navigateur
    console.log('Données prévisualisées:', previewData);
  }

   // Méthode pour naviguer
   navigateToProductList() {
    this.router.navigate(['/admin/produit']);
  }
  
}
