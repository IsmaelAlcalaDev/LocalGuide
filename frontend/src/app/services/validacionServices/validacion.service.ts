import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
      name: [userData.name || '', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],
      surname: [userData.surname || '', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]],
      password: ['', [
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$')
      ]],
      matchPassword: [''],
      country: [userData.country || '', [Validators.required]],
      city: [userData.city || '', [Validators.required]],
      phone: [userData.phone || '', [
        Validators.required,
        Validators.pattern('^\\d{9}$')
      ]],
      gender: [userData.gender || '', Validators.required],
      email: [userData.email || '', [
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
      profileImg: [user.profileImg || ''],
    }, { validators: this.validateMatchPassword });
  }

  validateReserveForm(): FormGroup {
    return this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      hours: ['', [Validators.required, Validators.min(0)]]
    }, { validators: this.dateRangeValidator });
  }

  private dateRangeValidator(formGroup: FormGroup) {
    const startDate = new Date(formGroup.get('startDate')?.value);
    const endDate = new Date(formGroup.get('endDate')?.value);
    const currentDate = new Date();

    if (endDate < startDate) {
      formGroup.get('endDate')?.setErrors({ 'fechaInvalida': true });
    }

    if (endDate < currentDate) {
      formGroup.get('endDate')?.setErrors({ 'fechaInvalida': true });
    }

    if (startDate < currentDate) {
      formGroup.get('startDate')?.setErrors({ 'fechaInvalida': true });
    }

    if (endDate < startDate || endDate < currentDate || startDate < currentDate) {
      return { 'rangoInvalido': true };
    } else {
      return null;
    }
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

  validatePaymentForm(): FormGroup {
    return this.formBuilder.group({
      paymentMethod: ['', [Validators.required, Validators.pattern('^(BIZUM|TARJETA|TRANSFERENCIA)$')]],
      cardNumber: ['', [Validators.required, Validators.pattern('^\\d{4}(?:\\s\\d{4}){3}$')]],
      expiryDate: ['', [Validators.required, this.futureDateValidator()]], 
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }
  
  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputValue = control.value;
      
      // Verificar el formato mm/yy
      const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!pattern.test(inputValue)) {
        return { invalidFormat: true };
      }
      
      // Extraer mes y año
      const [month, year] = inputValue.split('/');
      const inputDate = new Date(`20${year}-${month}-01`); // Agregamos '20' al año para obtener el año completo
      
      // Obtener fecha actual
      const currentDate = new Date();
      
      // Verificar si es una fecha válida y no es anterior al día actual
      if (isNaN(inputDate.getTime()) || inputDate < currentDate) {
        return { invalidExpiryDate: true };
      }
      
      return null;
    };
  }
  

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
