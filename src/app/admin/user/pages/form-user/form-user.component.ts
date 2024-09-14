import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/shared/services/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.userService.getUserById(this.id).subscribe(
        (response) => {
          const userData = response.data;
          this.userForm.patchValue(userData);
  
          if (userData.image) {
            this.imagePreview = `data:image/jpeg;base64,${userData.image}`;
          }

          this.userForm.get('password')?.clearValidators();
          this.userForm.get('password')?.updateValueAndValidity();
          this.userForm.get('email')?.clearValidators();
          this.userForm.get('email')?.updateValueAndValidity();
        }
      );
    }
  }
  

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('name', this.userForm.get('name')?.value);
      formData.append('telephone', this.userForm.get('telephone')?.value);
      formData.append('email', this.userForm.get('email')?.value);

      // Ajouter le mot de passe uniquement si un nouveau mot de passe est fourni
      const passwordValue = this.userForm.get('password')?.value;
      if (passwordValue) {
        formData.append('password', passwordValue);
      }

      // Gestion de l'image
      if (this.userForm.get('image')?.value) {
        formData.append('image', this.userForm.get('image')?.value);
      }

      if (this.id) {
        this.userService.updateUser(this.id, formData).subscribe(
          (response) => {   
            Swal.fire({
              icon: 'success',
              title: 'Mise à jour réussie',
              text: 'Les informations de l\'utilisateur ont été mises à jour avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            this.router.navigate(['/admin/user/']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
          }
        );
      }else{
        this.userService.createAdmin(formData).subscribe({
          next: (response) => {
            if (response.success) {
              Swal.fire({
                icon: 'success',
                title: 'Utilisateur ajouté',
                text: 'Un nouvel utilisateur a été ajouté avec succès!',
                timer: 2000,
                showConfirmButton: false
              });
              this.router.navigate(['/admin/user/']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: response.message || 'Une erreur est survenue.',
              });
            }
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erreur lors de la création de l\'utilisateur:', err);
          
            let errorMessage = 'Une erreur est survenue lors de la création de l\'utilisateur.';
          
            if (err.error) {
              if (err.error.errors) {
                const errorMessages = Object.values(err.error.errors).flat().join(', ');
                errorMessage = errorMessages || errorMessage;
              } else if (err.error.message) {
                errorMessage = err.error.message;
              }
            } else if (err.message) {
              errorMessage = err.message;
            }
          
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: errorMessage,
            });
          }
        });
      }
      
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Erreur',
        text: 'Votre formulaire n\'est pas valide !',
      });
    }
  }


    onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.patchValue({
        image: file
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
