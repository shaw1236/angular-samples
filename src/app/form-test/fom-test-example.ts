import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-test',
  template: `
    <div>
      <h2>Form Example</h2>
      <label for="name"><b>Name:</b> </label>
      <input type="text" [formControl]="name">
      <p *ngIf="name?.value"> Your input: {{ name.value }} </p>
      <button type="button" (click)="updateName()">Update Name</button>

      <form [formGroup]="profileForm" novalidate (ngSubmit)="onSubmit()">
        <label for="first-name">First Name: </label>
        <input id="first-name" type="text" formControlName="firstName">
        <label for="last-name">Last Name: </label>
        <input id="last-name" type="text" formControlName="lastName">
        <div formGroupName="address">
          <h4>Address</h4>
          <label for="street">Street: </label>
          <input id="street" type="text" formControlName="street">

          <label for="city">City: </label>
          <input id="city" type="text" formControlName="city">

          <label for="state">State: </label>
          <input id="state" type="text" formControlName="state">

          <label for="zip">Zip Code: </label>
          <input id="zip" type="text" formControlName="zip">
        </div>
        <div formArrayName="aliases">
        <h4>Aliases</h4>
          <button type="button" (click)="addAlias()">+ Add another alias</button>
          <div *ngFor="let alias of aliases.controls; let i=index">
            <!-- The repeated alias template -->
            <label for="alias-{{ i }}">Alias:</label>
            <input id="alias-{{ i }}" type="text" [formControlName]="i">
          </div>
        </div>
        <p>Form Status: {{ profileForm.status }}</p>
        <p>Complete the form to enable button.</p>
        <button type="submit" [disabled]="!profileForm.valid">Submit</button>
      </form>
      <button type="button" (click)="updateProfile()">Update Profile</button>
    </div>
  ` 
})
export class FormTestExampleComponent {
  profileForm: FormGroup;
  name = new FormControl('');
  constructor(private fb: FormBuilder) {
    //this.name.setValue('Sample');
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl('')
      }),
      aliases: new FormArray([ new FormControl('') ])
    });

    // Short form
    this.profileForm = this.fb.group({
      firstName: [ '', Validators.required ],
      lastName: [ '', [Validators.required, Validators.minLength(2)] ],
      address: fb.group({
        street: [ '' ],
        city: [ '' ],
        state: [ '' ],
        zip: [ '' ]
      }),
      aliases: this.fb.array([ this.fb.control('')]) 
    });
 
  }

  get aliases(): FormArray {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  updateName() {
    this.name.setValue('Nancy');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  updateProfile() {
    const addressForm = this.profileForm.controls["address"];
    const addressData = this.profileForm.value.address;
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }
}