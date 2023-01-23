import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-13';

  // Can be set as a configuration or by binding the user locale in the future
  localeOptions = {
    america: {
      decimalSeparator: '.',
      thousandSeparator: ',',
    },
    europe: {
      decimalSeparator: ',',
      thousandSeparator: '.',
    },
  };

  testInputMask = createMask({
    // min
    // max
    alias: 'numeric',
    digits: 2,
    groupSeparator: this.localeOptions.america.thousandSeparator,
    radixPoint: this.localeOptions.america.decimalSeparator,
    digitsOptional: false,
    allowMinus: true,
    rightAlign: false,
    parser: (value: string) => {
      return value.replace(',', '');
    },
  });

  control = new FormControl();

  ngOnInit(): void {
    this.control.setValue(1.8);
  }

  logToConsoleAndReassignValue(value: Number): void {
    this.control.setValue(value);
    console.log(this.control);
  }
}
