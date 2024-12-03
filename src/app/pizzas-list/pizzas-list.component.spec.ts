import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasListComponent } from './pizzas-list.component';

describe('PizzasListComponent', () => {
  let component: PizzasListComponent;
  let fixture: ComponentFixture<PizzasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzasListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
