import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementJoursComponent } from './paiement-jours.component';

describe('PaiementJoursComponent', () => {
  let component: PaiementJoursComponent;
  let fixture: ComponentFixture<PaiementJoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementJoursComponent]
    });
    fixture = TestBed.createComponent(PaiementJoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
