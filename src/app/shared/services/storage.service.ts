import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static setItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item))
  }

  static getItem(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  static deleteItem(key: string) {
    localStorage.removeItem(key)
  }
}
