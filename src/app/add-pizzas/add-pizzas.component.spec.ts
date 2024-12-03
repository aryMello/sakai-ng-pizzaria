import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPizzasComponent } from './add-pizzas.component';

describe('AddPizzasComponent', () => {
  let component: AddPizzasComponent;
  let fixture: ComponentFixture<AddPizzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPizzasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
