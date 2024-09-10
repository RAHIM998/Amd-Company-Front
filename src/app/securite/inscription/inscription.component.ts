import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from 'src/app/shared/services/AuthService/auth-service.service';
import { AuthResponse } from 'src/app/shared/models/Authentification/auth-response';
import { TokenService } from 'src/app/shared/services/AuthService/token.service';
import { Router } from '@angular/router';
import { AuthRegister } from 'src/app/shared/models/auth-register';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  selectedFile: File | null = null;
  imagePreview: string = '';

  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthServiceService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,4})?\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['user'], // Valeur par défaut ou selon ta logique
      image: [null] // Champ pour l'image
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Mettre à jour le champ du formulaire avec le fichier
      this.clientForm.patchValue({
        image: file
      });
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const formData = new FormData();
      formData.append('name', this.clientForm.get('name')?.value);
      formData.append('email', this.clientForm.get('email')?.value);
      formData.append('telephone', this.clientForm.get('telephone')?.value);
      formData.append('password', this.clientForm.get('password')?.value);
      formData.append('role', this.clientForm.get('role')?.value); 
  
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
     
      this.authService.Register(formData).subscribe(
        response => {
          if (response.success) {
            const authRegister: AuthRegister = response.data!;
            this.tokenService.saveToken(authRegister.access_token);
            localStorage.setItem('name', authRegister.user.name);
            localStorage.setItem('id', authRegister.user.id.toString());
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });

          }
        },
        error => {
        
          console.error('Erreur de connexion', error);
        }
      );
    }     
  }

}
