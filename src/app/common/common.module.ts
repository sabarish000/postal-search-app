import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SearchableDropdownComponent } from './searchable-dropdown/searchable-dropdown.component';
import { FilterableDropdownComponent } from './filterable-dropdown/filterable-dropdown.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    SearchableDropdownComponent,
    FilterableDropdownComponent,
    TableComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    SearchableDropdownComponent,
    FilterableDropdownComponent,
    TableComponent
  ]
})
export class CommonModule { }
