import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';  // Cambiado a UserComponent
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('UserComponent', () => {  
  let component: UserComponent;  
  let fixture: ComponentFixture<UserComponent>;  // Cambiado a UserComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
      ],
      declarations: [UserComponent]  // Cambiado a UserComponent
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);  // Cambiado a UserComponent
    component = fixture.componentInstance;  // Cambiado a UserComponent
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
