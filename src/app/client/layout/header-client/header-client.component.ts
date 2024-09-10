import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/Category/category';
import { AuthServiceService } from 'src/app/shared/services/AuthService/auth-service.service';
import { TokenService } from 'src/app/shared/services/AuthService/token.service';
import { CategoryServiceService } from 'src/app/shared/services/CategoryService/category-service.service';
import { PanierService } from 'src/app/shared/services/Panier/panier.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit{
  
  categories: Category[] = [];
  cartItemCount: number = 0;
  displayName: string = 'Profile'; 
  userName: string = '';
  isConnected: boolean = false;
  searchQuery: string = '';
  
  constructor(
    private categoryService: CategoryServiceService,
    private panierService: PanierService,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthServiceService
  ) { }
  
  ngOnInit(): void {
    this.getAllCategory();
    this.checkConnectionStatus();
    this.panierService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  checkConnectionStatus() {
    this.isConnected = this.tokenService.isConnect();
    if (this.isConnected) {
      const user = localStorage.getItem('name');
      this.userName = user ? user : '';
    }
  }

  getAllCategory(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        if(response.success){
          this.categories = response.data;
        }else{
          console.log(response.message);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }


  logout() {
    this.tokenService.logOut();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
  }); 

  }


  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { query: this.searchQuery } });
    }
  }


  
}
