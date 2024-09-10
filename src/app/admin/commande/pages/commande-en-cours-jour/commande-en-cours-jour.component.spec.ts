import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeEnCoursJourComponent } from './commande-en-cours-jour.component';

describe('CommandeEnCoursJourComponent', () => {
  let component: CommandeEnCoursJourComponent;
  let fixture: ComponentFixture<CommandeEnCoursJourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeEnCoursJourComponent]
    });
    fixture = TestBed.createComponent(CommandeEnCoursJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
