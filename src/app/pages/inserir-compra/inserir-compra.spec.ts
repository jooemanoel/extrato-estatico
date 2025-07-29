import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirCompra } from './inserir-compra';

describe('InserirCompra', () => {
  let component: InserirCompra;
  let fixture: ComponentFixture<InserirCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserirCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirCompra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
