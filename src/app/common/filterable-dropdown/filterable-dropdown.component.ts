import { Component, computed, forwardRef, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'my-filterable-dropdown',
  templateUrl: './filterable-dropdown.component.html',
  styleUrl: './filterable-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterableDropdownComponent),
      multi: true,
    },
  ],
})
export class FilterableDropdownComponent implements ControlValueAccessor {
  searchInput = new FormControl('');

  label = input('');
  options = input<string[]>([]);

  searchText = toSignal<string>(this.searchInput.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    tap((value) => this.writeValue((value ?? '').toLowerCase())),
    map((value) => (value ?? '')
  )));
  
  _filtered = computed(() => this.options()?.filter(a => a.toLowerCase().includes((this.searchText() ?? '').toLowerCase())));

  private onChange: (value: string) => void;
  private onTouched: () => void;
  onOptionSelected(event: any) {
    this.writeValue(event.option.value?.toLowerCase());
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
