import { Component, inject, OnInit } from '@angular/core';
import { Area } from '../../core/models/area';
import { DataService } from '../../core/services/data.service';
import {  Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-by-address',
  templateUrl: './by-address.component.html',
  styleUrl: './by-address.component.scss'
})
export class ByAddressComponent implements OnInit{
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  // Earlier versions, we used to inject using a constructor
  // constructor(private dataService: DataService,
  //   private fb: FormBuilder
  // ) { }

  colsMetaData:Map<string,string> = new Map([
    ['zipCode', 'Zip code'],
    ['name', 'Name'],
    ['city', 'City'],
    ['district', 'District'],
    ['state', 'State']
  ]);
  
  cities: string[] = [];
  cityAreas$: Observable<string[]>;
  data: Area[] = [];
  selectedCity: string;
  selectedArea: string = '';
  searchForm: FormGroup;
  
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      area: ['']
    });
    this.searchForm.get('city')?.valueChanges.subscribe(val => {
      this.cityAreas$ = val ? this.dataService.getCityAreas(val) : of([]);
    });
  }

  getCities(name: unknown) {
    this.dataService.getCitiesByName(name as string)
    .subscribe(resp => {
      this.cities = resp.map(val => val.name);
    })
  }

  submit() {
    this.dataService.getAreasByName(this.searchForm.get('city')?.value, this.searchForm.get('area')?.value)
    .subscribe(resp =>{
      console.log("Data", resp);
      this.data = resp;
    });
  }
}
