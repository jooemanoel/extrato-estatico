import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFatura } from './editar-fatura';

describe('EditarFatura', () => {
  let component: EditarFatura;
  let fixture: ComponentFixture<EditarFatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFatura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFatura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
