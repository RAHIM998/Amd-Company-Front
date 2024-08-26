import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { }

  connect:boolean=false
  token: string = "";

  //Service de recupération du token 
   getToken():any{
    return localStorage.getItem('token');
  }

  //Service de stockage du token
  saveToken(token:any){
    localStorage.setItem('token', token)
  }

  //Service de vérification de la connexion de l'utilisateur 
  isConnect():boolean{
    const token :any = this.getToken()
    if (token != null) {
      return this.connect = true
    }
    return this.connect
  }

  //Service de déconnexion de l'utilisateur
  logOut(){
    localStorage.clear()
    this.router.navigate(['/client/products/catalogue']);
  }
}
