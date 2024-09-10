import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactServiceService } from 'src/app/shared/services/Contact/contact-service.service';
import { Contact } from 'src/app/shared/models/Contact/contact';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';  // Import de SweetAlert2

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  showEmailForm = false;

  ContactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d{1,4}[\s-]?\d+$/)]],
    object: ['', Validators.required],
    message: ['', Validators.required,  Validators.maxLength(1000)]
  });

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactServiceService,
  ) {}

  ngOnInit(): void {
    //
  }

  AddMessage() {
    if (this.ContactForm.valid) {
      const contactData: Contact = this.ContactForm.value as Contact;
      this.contactService.addMessage(contactData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Message envoyé',
            text: 'Votre message a été envoyé avec succès !',
            confirmButtonText: 'OK'
          });
          this.ContactForm.reset();  
          this.closeEmailForm();     
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'envoi du message :', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.error('Formulaire invalide');
      Swal.fire({
        icon: 'error',
        title: 'Erreur de validation',
        text: 'Veuillez remplir tous les champs correctement.',
        confirmButtonText: 'OK'
      });
    }
  }

  openEmailForm() {
    this.showEmailForm = true;
  }

  closeEmailForm() {
    this.showEmailForm = false;
  }
}
