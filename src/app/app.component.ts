import { NumberSymbol, getLocaleNumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { TranslateService } from '@ngx-translate/core';
import { getUserLocale } from 'get-user-locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  userLocale: string = this.translateService.getBrowserLang() || 'en';
  // userLocale: string = 'fr';

  // is possible to create here a cascade switch case that end up on default "en" locale
  // between the imported languages, because if the language of the user is not importated on
  // in app.module.ts, than it will fails into an error.

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
      return value.replace(',', '');
    },
  });

  control = new FormControl();

  ngOnInit(): void {
    console.log(this.translateService.getBrowserLang());
    this.control.setValue(1515265.8);
  }

  logToConsoleAndReassignValue(value: Number): void {
    this.control.setValue(value);
    console.log(this.control);
  }
}
