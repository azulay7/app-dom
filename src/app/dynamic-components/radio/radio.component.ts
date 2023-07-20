import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input()
  label: string = '';

  @Input()
  options: string[] = [];

  @Input()
  formControl: FormControl = new FormControl();
}
