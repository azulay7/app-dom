import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../form-field.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  INPUT_TYPES = ['text', 'checkbox', 'radio', 'select'];
  OPTIONS_TYPES = ['radio', 'select'];
  dynamicForm: FormGroup = {} as FormGroup;
  formFields: FormField[] = [];

  get controlType() {
    return this.dynamicForm.controls["controlType"] as FormControl;
  }

  get controlName() {
    return this.dynamicForm.controls["controlName"] as FormControl;
  }

  get isRequired() {
    return this.dynamicForm.controls["isRequired"] as FormControl;
  }

  get options() {
    return this.dynamicForm.controls["options"] as FormControl;
  }

  get dynamicControls() {
    return this.dynamicForm.controls["dynamicControls"] as FormArray;
  }

  get dynamicControlsForTemplate() {
    return (this.dynamicForm.controls["dynamicControls"] as FormArray).controls as FormControl[];
  }

  formData:string='';

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({
      controlType: ['', [Validators.required]],
      controlName: ['', [Validators.required]],
      options: [null],
      isRequired: [false, [Validators.required]],
      dynamicControls: this.fb.array([])
    })
    this.dynamicForm.valueChanges.subscribe(changes => {

      this.dynamicForm.controls['options'].clearValidators();

      if (this.OPTIONS_TYPES.includes(changes['controlType'])) {
        this.dynamicForm.controls['options'].addValidators(Validators.required);

      }
    })
  }
  onSubmit() {
    this.formData= JSON.stringify(this.formFields.map((ff,i)=>({name:ff.name, value:this.dynamicControls.value[i]})),null, 2) //JSON.stringify(this.dynamicControls.value, null, 2);

  }

  addFormField(): void {
    const controlTypeVal = this.controlType.value;
    const controlNameVal = this.controlName.value;
    const options = this.dynamicForm.controls["options"].value?.split(',');
    const newField: FormField = {
      name: controlNameVal, // Assign a name to each control
      controlType: controlTypeVal,
      required: this.isRequired.value,
      options
    };
    this.formFields.push(newField);
    this.dynamicControls.push(this.createFieldGroup(newField));

    this.controlName.setValue('');
    this.controlType.setValue('');
    this.isRequired.setValue(false);
    this.options.setValue('');
  }

  createFieldGroup(field: FormField): FormControl {
    const validators = field.required ? [Validators.required] : [];
    return this.fb.control([],validators);
  }

  updateForm(): void {
    this.dynamicForm = this.fb.group({});
    this.formFields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      this.dynamicForm.addControl(field.name, validators);
    });
  }
}
