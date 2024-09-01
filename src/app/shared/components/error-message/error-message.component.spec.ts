import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when control has errors and is touched', () => {
    const control = new FormControl('', { validators: [Validators.required], updateOn: 'blur' });
    control.markAsTouched();
    control.setErrors({ required: true });
    component.control = control;
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.invalid-feedback')).nativeElement;

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Required'); // Assuming `ValidatorService` returns this message for required errors
  });

  it('should not display error message when control has no errors or is not touched', () => {
    const control = new FormControl('');
    component.control = control;
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorMessage).toBeFalsy();
  });
});
