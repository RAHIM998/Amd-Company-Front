import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerCommandeComponent } from './payer-commande.component';

describe('PayerCommandeComponent', () => {
  let component: PayerCommandeComponent;
  let fixture: ComponentFixture<PayerCommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayerCommandeComponent]
    });
    fixture = TestBed.createComponent(PayerCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
