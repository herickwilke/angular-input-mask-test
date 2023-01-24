import { NumberSymbol, getLocaleNumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  control = new FormControl();

  importedLanguages = ['fr', 'pt', 'de'];

  browserLanguage = this.translateService.getBrowserLang() || 'en';

  userLocale: string = this.importedLanguages.includes(this.browserLanguage)
    ? this.browserLanguage
    : 'en';

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
      return value;
    },
  });

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    console.log(this.translateService.getBrowserLang());
    this.control.setValue(1515265.8);
  }

  logToConsoleAndReassignValue(value: Number): void {
    this.control.setValue(value);
    console.log(this.control);
  }
}
