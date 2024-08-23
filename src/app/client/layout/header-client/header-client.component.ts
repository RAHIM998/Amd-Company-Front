import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/Category/category';
import { CategoryServiceService } from 'src/app/shared/services/CategoryService/category-service.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit{
  
  categories: Category[] = [];
  
  constructor(private categoryService: CategoryServiceService) { }
  
  ngOnInit(): void {
    this.getAllCategory();
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




}
