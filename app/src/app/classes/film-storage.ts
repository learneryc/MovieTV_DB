export class FilmStorage {

  static getStorage(storage: string): any[] {
    let data = localStorage.getItem(storage);
    if (data == null) return [];
    return JSON.parse(data);
  }

  static indexOfItem(data: any[], item: any): number {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === item.id && data[i].type === item.type) return i;
    }
    return -1;
  }

  static itemExist(storage: string, item: any): boolean {
    let data = this.getStorage(storage);
    return this.indexOfItem(data, item) >= 0;
  }

  static setStorage(storage: string, item: any): void {
    let data = this.getStorage(storage);
    let index = this.indexOfItem(data, item);
    if (index >= 0) data.splice(index, 1);

    data.splice(0, 0, item);
    if (storage === 'continueWatching') data = data.slice(0, 24);
    localStorage.setItem(storage, JSON.stringify(data));
  }

  static removeItem(storage: string, item: any): void {
    let data = this.getStorage(storage);
    let index = this.indexOfItem(data, item);
    data.splice(index, 1);
    localStorage.setItem(storage, JSON.stringify(data));
  }
}
