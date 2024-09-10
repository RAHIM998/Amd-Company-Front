import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeAnnuleeJourComponent } from './commande-annulee-jour.component';

describe('CommandeAnnuleeJourComponent', () => {
  let component: CommandeAnnuleeJourComponent;
  let fixture: ComponentFixture<CommandeAnnuleeJourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeAnnuleeJourComponent]
    });
    fixture = TestBed.createComponent(CommandeAnnuleeJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
