import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelFaturas } from './painel-faturas';

describe('PainelFaturas', () => {
  let component: PainelFaturas;
  let fixture: ComponentFixture<PainelFaturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelFaturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelFaturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
