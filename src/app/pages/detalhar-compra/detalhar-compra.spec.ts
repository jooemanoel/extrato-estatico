import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharCompra } from './detalhar-compra';

describe('DetalharCompra', () => {
  let component: DetalharCompra;
  let fixture: ComponentFixture<DetalharCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalharCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharCompra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
