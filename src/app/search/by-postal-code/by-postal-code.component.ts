import { Component, inject } from '@angular/core';
import { PostalAddress } from '../../core/models/postal-address';
import { DataService } from '../../core/services/data.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-by-postal-code',
  templateUrl: './by-postal-code.component.html',
  styleUrl: './by-postal-code.component.scss'
})
export class ByPostalCodeComponent {
  dataService = inject(DataService);

  postcodeCtrl: FormControl= new FormControl('');
  data: PostalAddress[] = []
  colsMetaData:Map<string,string> = new Map([
    ['postalCode', 'Zip code'],
    ['street', 'Name'],
    ['city', 'City'],
    ['district', 'District'],
    ['state', 'State']
  ]);
  ngOnInit(): void {
    this.postcodeCtrl?.valueChanges.pipe(
      debounceTime(300)
    ).subscribe( val => {
      this.dataService.getAreasByCode(val).subscribe(resp =>{
        this.data = resp;
      })
    });
  }
}
