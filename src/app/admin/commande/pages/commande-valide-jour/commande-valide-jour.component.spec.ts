import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeValideJourComponent } from './commande-valide-jour.component';

describe('CommandeValideJourComponent', () => {
  let component: CommandeValideJourComponent;
  let fixture: ComponentFixture<CommandeValideJourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeValideJourComponent]
    });
    fixture = TestBed.createComponent(CommandeValideJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
