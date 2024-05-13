import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor(private formBuilder: FormBuilder) { }

  // Validación del formulario de inicio de sesión
  validateLogin(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Establecer errores personalizados para el formulario de inicio de sesión
  setFormErrorsLogin(form: FormGroup): void {
    const emailControl = form.get('email');
    const passwordControl = form.get('password');

    // Establecer error personalizado si el campo de correo electrónico está vacío
    if (emailControl?.errors?.['required']) {
      emailControl.setErrors({ customError: 'El correo electrónico es obligatorio' });
    }

    if (emailControl?.errors?.['email']) {
      emailControl.setErrors({ customError: 'El correo electrónico no es válido' });
    }

    // Establecer error personalizado si el campo de contraseña está vacío
    if (passwordControl?.errors?.['required']) {
      passwordControl.setErrors({ customError: 'La contraseña es obligatoria' });
    }
  }

  // Validación del formulario de registro
  validateRegister(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$')
      ]],
      matchPassword: ['', Validators.required],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^\\d{9}$')
      ]],
      gender: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    }, { validators: this.validateMatchPassword });
  }

  // Validación del formulario de actualización de información de turistas
  validateUpdateFormTourist(userData: any): FormGroup {
    return this.formBuilder.group({
      name: [userData.user.name || '', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],
      surname: [userData.user.surname || '', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],
      password: ['', [
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$')
      ]],
      matchPassword: [''],
      country: [userData.user.country || '', [Validators.required]],
      city: [userData.user.city || '', [Validators.required]],
      phone: [userData.user.phone || '', [
        Validators.required,
        Validators.pattern('^\\d{9}$')
      ]],
      gender: [userData.user.gender || '', Validators.required],
      email: [userData.user.email || '', [
        Validators.required,
        Validators.email
      ]],
    }, { validators: this.validateMatchPassword });
  }

  // Validación del formulario de actualización de información de guías
  validateUpdateFormGuide(user: any): FormGroup {
    return this.formBuilder.group({
      name: [user.name || '', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],
      surname: [user.surname || '', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],
      password: ['', [
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$')
      ]],
      matchPassword: [''],
      country: [user.country || '', [Validators.required]],
      city: [user.city || '', [Validators.required]],
      phone: [user.phone || '', [
        Validators.required,
        Validators.pattern('^\\d{9}$')
      ]],
      gender: [user.gender || '', Validators.required],
      email: [user.email || '', [
        Validators.required,
        Validators.email
      ]],
      languages: [user.languages || '',],
      hobbies: [user.hobbies || '',],
      phrase: [user.phrase || ''],
      additionalInfo: [user.additionalInfo || ''],
      hourlyPrice: [user.hourlyPrice || 0],
      identityDocument: [user.identityDocument || ''],
      backgroundCheckCertificate: [user.backgroundCheckCertificate || ''],

    }, { validators: this.validateMatchPassword });
  }

  // Validación de la coincidencia de contraseñas
  validateMatchPassword(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const matchPassword = formGroup.get('matchPassword')?.value;
    if (password !== matchPassword) {
      formGroup.get('matchPassword')?.setErrors({ match: true });
      return { match: true };
    }
    return null;
  }

  // Validación del país seleccionado
  validateCountry(control: AbstractControl, countries: string[]): ValidationErrors | null {
    const country = control.value;
    if (!countries.includes(country)) {
      return { invalidCountry: true };
    }
    return null;
  }

  // Validación de la ciudad seleccionada
  validateCity(control: AbstractControl, cities: { [key: string]: string[] }): ValidationErrors | null {
    const city = control.value;
    const selectedCountry = control.parent?.get('country')?.value;
    if (!cities[selectedCountry] || !cities[selectedCountry].includes(city)) {
      return { invalidCity: true };
    }
    return null;
  }

}
