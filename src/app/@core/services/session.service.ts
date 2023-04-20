import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  /**
   * Adds a new object of type {T} entry in the session storage associated with the given key.
   * The object will be converted to a JSON structure.
   * @param key the item key that identifes the object within the storage.
   * @param value the object type to be added into the session storage.
   */
  setObject<T>(key: string, value: T): void {
    const item = JSON.stringify(value);
    this.setItem(key, item);
  }

  /**
   * Adds a new key/value pair entry in the session storage.
   * @param key the item key that identifes the object within the storage.
   * @param value the string value to be added into the session storage.
   */
  setItem(key: string, value: string): void {
    if (!this.exist(key)) {
      sessionStorage.setItem(key, value);
    } else {
      sessionStorage.removeItem(key);
      sessionStorage.setItem(key, value);
    }
  }

  /**
   * Gets an item of type {T} associated with the given key, or null if the given key does not exists.
   * @param key the item key to find within the session storage.
   * @returns the item associated with its key if it exists, otherwise it will return null.
   */
  getObject<T>(key: string): T | null {
    const item = this.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  }

  /**
   * Returns an item associated with the given key, or null if the given key does not exists.
   * @param key the item key to find within the session storage.
   * @returns the item associated with the key or null.
   */
  getItem(key: string): string | null {
    const item = sessionStorage.getItem(key);
    return item ? item : null;
  }

  /**
   * Checks whether the item exists or not.
   * @param key the item key to find in the session storage.
   * @returns true of the item exists or false.
   */
  exist(key: string): boolean {
    return this.getItem(key) !== null;
  }

  /**
   * Removes an item with the given key, if an item with the given key exists.
   * @param key the item key to find in the session storage.
   */
  remove(key: string): void {
    if (this.exist(key)) {
      sessionStorage.removeItem(key);
    }
  }

  /**
   * Removes all keys/value pairs, if there are any.
   */
  clear(): void {
    sessionStorage.clear();
  }
}
