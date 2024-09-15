import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementEnAttenteComponent } from './paiement-en-attente.component';

describe('PaiementEnAttenteComponent', () => {
  let component: PaiementEnAttenteComponent;
  let fixture: ComponentFixture<PaiementEnAttenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementEnAttenteComponent]
    });
    fixture = TestBed.createComponent(PaiementEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
