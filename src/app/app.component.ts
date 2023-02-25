import { NumberSymbol, getLocaleNumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { TranslateService } from '@ngx-translate/core';
import getUserLocale from 'get-user-locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  control = new FormControl();
  supportedLanguages = ['fr', 'pt', 'de'];

  defaultLocale = 'en'
  retrieveLocale: string = getUserLocale({fallbackLocale: 'en-US'})!.substring(0,2)
  userLocale: string = this.supportedLanguages.includes(this.retrieveLocale) ? this.retrieveLocale : 'en'

  testInputMask = createMask({
    // min
    // max
    alias: 'numeric',
    digits: 2,
    groupSeparator: getLocaleNumberSymbol(
      this.userLocale,
      NumberSymbol.CurrencyGroup
    ),
    radixPoint: getLocaleNumberSymbol(
      this.userLocale,
      NumberSymbol.CurrencyDecimal
    ),
    digitsOptional: false,
    allowMinus: true,
    rightAlign: false,
    parser: (value: string) => {
      return this.localeParseFloat(value, this.userLocale);
    },
  });

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    console.log(this.retrieveLocale)
    console.log(this.userLocale)
    this.control.setValue(1515265.8);
  }

  localeParseFloat(value: string, locale: string) {
    // Get the thousands and decimal separator characters used in the locale.
    let [, thousandsSeparator, , , , decimalSeparator] =
      (1111.1).toLocaleString(locale);
    // Remove thousand separators, and put a point where the decimal separator occurs
    value = Array.from(value, (c) =>
      c === thousandsSeparator ? '' : c === decimalSeparator ? '.' : c
    ).join('');
    // Now it can be parsed
    return parseFloat(value);
  }

  logToConsoleAndReassignValue(value: string): void {
    console.log(value);
    this.control.setValue(value);
    console.log(this.control);
  }
}
