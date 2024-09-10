import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapCommandeComponent } from './recap-commande.component';

describe('RecapCommandeComponent', () => {
  let component: RecapCommandeComponent;
  let fixture: ComponentFixture<RecapCommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecapCommandeComponent]
    });
    fixture = TestBed.createComponent(RecapCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
