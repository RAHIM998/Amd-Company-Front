import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryproductComponent } from './categoryproduct.component';

describe('CategoryproductComponent', () => {
  let component: CategoryproductComponent;
  let fixture: ComponentFixture<CategoryproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryproductComponent]
    });
    fixture = TestBed.createComponent(CategoryproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
