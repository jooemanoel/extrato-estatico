import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirArquivo } from './inserir-arquivo';

describe('InserirArquivo', () => {
  let component: InserirArquivo;
  let fixture: ComponentFixture<InserirArquivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserirArquivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirArquivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
