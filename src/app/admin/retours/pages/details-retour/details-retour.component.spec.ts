import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRetourComponent } from './details-retour.component';

describe('DetailsRetourComponent', () => {
  let component: DetailsRetourComponent;
  let fixture: ComponentFixture<DetailsRetourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsRetourComponent]
    });
    fixture = TestBed.createComponent(DetailsRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
