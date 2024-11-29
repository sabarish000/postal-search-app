import { Component, EventEmitter, forwardRef, input, Input, OnInit, output, Output } from '@angular/core';
import { ControlValueAccessor, FormControl,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, startWith, switchMap } from 'rxjs';


@Component({
  selector: 'my-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrl: './searchable-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableDropdownComponent),
      multi: true,
    },
  ],
})
export class SearchableDropdownComponent
  implements OnInit, ControlValueAccessor
{
  searchInput = new FormControl('');

  label = input('');
  options = input<string[]>([]);
  
  onInputChange = output<string>();
  
  
  private onChange: (value: string) => void;
  private onTouched: () => void;
  constructor() {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value) => (value ?? '').toLowerCase())
      )
      .subscribe((value) => {
        this.onInputChange.emit(value);
      });
  }

  onOptionSelected(event: any) {
    this.writeValue(event.option.value);
  }

  writeValue(val: string): void {
    if (this.onChange) {
      this.onChange(val);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchInput.disable();
    } else {
      this.searchInput.enable();
    }
  }
}
