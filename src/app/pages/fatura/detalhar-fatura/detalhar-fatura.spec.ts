import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharFatura } from './detalhar-fatura';

describe('DetalharFatura', () => {
  let component: DetalharFatura;
  let fixture: ComponentFixture<DetalharFatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalharFatura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharFatura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
