import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitServiceService } from 'src/app/shared/services/ProduitService/produit-service.service';

@Component({
  selector: 'app-form-produit',
  templateUrl: './form-produit.component.html',
  styleUrls: ['./form-produit.component.css']
})
export class FormProduitComponent implements OnInit{

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitServiceService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    //
  }

}
