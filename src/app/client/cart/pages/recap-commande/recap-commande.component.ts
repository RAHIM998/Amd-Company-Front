import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Produits } from 'src/app/shared/models/Produits/produits';
import { CommandeServiceService } from 'src/app/shared/services/CommandeService/commande-service.service';
import { PanierService } from 'src/app/shared/services/Panier/panier.service';

@Component({
  selector: 'app-recap-commande',
  templateUrl: './recap-commande.component.html',
  styleUrls: ['./recap-commande.component.css']
})
export class RecapCommandeComponent implements OnInit {
  items: Produits[] = [];
  total: number = 0;
  recapForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commandeService: CommandeServiceService,
    private panierService: PanierService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.items = navigation.extras.state['items'] || [];
      this.total = navigation.extras.state['total'] || 0;
    }

    if (this.items.length === 0) {
      // Si les items ne sont pas passés dans l'état, on les récupère depuis le service du panier
      this.items = this.panierService.getItems();
      //this.total = this.panierService.getTotal();
    }

    this.recapForm = this.fb.group({
      adresseLivraison: ['', [Validators.required, Validators.maxLength(255)]],
      method: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  getFormattedPrice(price: string): number {
    return parseFloat(price.replace(',', '.'));
  }

  confirmOrder() {
    if (this.recapForm.valid) {
      const adresseLivraison = this.recapForm.get('adresseLivraison')?.value;
      const paymentMethod = this.recapForm.get('method')?.value;
      const user_id = Number(localStorage.getItem('id'));

      const produits = this.items.map(item => ({
        id: item.id,
        quantite: item.quantity
      }));

      Swal.fire({
        title: 'Confirmation de commande',
        text: 'Êtes-vous sûr de vouloir confirmer cette commande ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, confirmer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          const orderData = {
            user_id,
            produits,
            adresseLivraison,
            method: paymentMethod
          };

          this.commandeService.createOrder(orderData).subscribe(
            response => {
              Swal.fire('Succès', 'Votre commande a été confirmée.', 'success');
              console.log('Réponse du serveur:', response);
              this.router.navigate(['/home']);
              this.panierService.clearPanier();
            },
            error => {
              Swal.fire('Erreur', 'La commande n\'a pas pu être confirmée. Veuillez réessayer.', 'error');
            }
          );
        }
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs requis avant de confirmer.', 'error');
    }
  }
}
