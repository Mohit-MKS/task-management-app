import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(item: any, key: string) {
    localStorage.setItem(JSON.stringify(item), key)
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  deleteItem(key: string) {
    localStorage.removeItem(key)
  }
}
