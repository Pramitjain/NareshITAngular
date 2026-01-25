import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCRUD } from './product-crud';

describe('ProductCRUD', () => {
  let component: ProductCRUD;
  let fixture: ComponentFixture<ProductCRUD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCRUD]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCRUD);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
