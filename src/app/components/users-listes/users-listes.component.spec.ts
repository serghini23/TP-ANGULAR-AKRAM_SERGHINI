import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListesComponent } from './users-listes.component';

describe('UsersListesComponent', () => {
  let component: UsersListesComponent;
  let fixture: ComponentFixture<UsersListesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
