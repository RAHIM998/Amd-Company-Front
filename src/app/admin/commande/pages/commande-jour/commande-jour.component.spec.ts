import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeJourComponent } from './commande-jour.component';

describe('CommandeJourComponent', () => {
  let component: CommandeJourComponent;
  let fixture: ComponentFixture<CommandeJourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeJourComponent]
    });
    fixture = TestBed.createComponent(CommandeJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
