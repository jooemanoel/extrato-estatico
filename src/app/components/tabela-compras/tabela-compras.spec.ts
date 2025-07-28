import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaCompras } from './tabela-compras';

describe('TabelaCompras', () => {
  let component: TabelaCompras;
  let fixture: ComponentFixture<TabelaCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
