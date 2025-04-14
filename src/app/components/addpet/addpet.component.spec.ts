// src/app/components/addper/addpet.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPetComponent } from './addpet.component';

describe('AddPetComponent', () => {
  let component: AddPetComponent;
  let fixture: ComponentFixture<AddPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPetComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
