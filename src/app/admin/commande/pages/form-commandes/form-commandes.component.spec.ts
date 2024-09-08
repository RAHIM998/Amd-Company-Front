import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCommandesComponent } from './form-commandes.component';

describe('FormCommandesComponent', () => {
  let component: FormCommandesComponent;
  let fixture: ComponentFixture<FormCommandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCommandesComponent]
    });
    fixture = TestBed.createComponent(FormCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
