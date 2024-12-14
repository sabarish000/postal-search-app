import { PostalAddress } from '../models/postal-address';
import { City } from '../models/city';

export const areas: PostalAddress[] = [
  {
    postalCode: 10001,
    street: 'Gothaer Str.',
    city: 'Berlin',
    district: 'Gesundbrunnen',
    state: 'Berlin',
    country: 'GERMANY',
  },
  {
    postalCode: 10315,
    street: 'Gotenstr',
    city: 'Berlin',
    district: 'KGA Bielefeld',
    state: 'Berlin',
    country: 'GERMANY',
  },
  {
    postalCode: 10829,
    street: 'Gotenstr1',
    city: 'Berlin',
    district: 'Schöneberg',
    state: 'Berlin',
    country: 'GERMANY',
  },
  {
    postalCode: 12524,
    street: 'Gothaer Str11.',
    city: 'Berlin',
    district: 'Altglienicke',
    state: 'Berlin',
    country: 'GERMANY',
  },
  {
    postalCode: 13595,
    street: 'Gotenstr12',
    city: 'Berlin',
    district: 'Wilhelmstadt',
    state: 'Berlin',
    country: 'GERMANY',
  },
  {
    postalCode: 14050,
    street: 'Gotha-Allee',
    number: '1 - 15 (ungerade)',
    city: 'Berlin',
    district: 'Westend',
    state: 'Berlin',
    country: 'GERMANY',
  },
];

export const cities: City[] = [
  {
    code: 1,
    name: 'Berlin',
    district: 'Gesundbrunnen',
    state: 'Berlin',
    country: 'GERMANY',
  },
  {
    code: 10,
    name: 'Bremen',
    district: '',
  },
  {
    code: 21,
    name: 'Bochum',
    district: '',
  },
  {
    code: 101,
    name: 'Bielefeld',
  },
  {
    code: 45,
    name: 'Bonn',
  },
  {
    code: 9,
    name: 'Braunschweig',
  },
  {
    code: 24,
    name: 'Bottrop',
  },
  {
    code: 101,
    name: 'Bremerhaven',
  },
  {
    code: 123,
    name: 'Bergisch Gladbach',
  },
  {
    code: 287,
    name: 'Bocholt',
  },
  {
    code: 722,
    name: 'Bayreuth',
  },
  {
    code: 891,
    name: 'Brandenburg an der Havel',
  },
];
