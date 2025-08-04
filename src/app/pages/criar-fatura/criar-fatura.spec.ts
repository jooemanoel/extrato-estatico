import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarFatura } from './criar-fatura';

describe('CriarFatura', () => {
  let component: CriarFatura;
  let fixture: ComponentFixture<CriarFatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarFatura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarFatura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
