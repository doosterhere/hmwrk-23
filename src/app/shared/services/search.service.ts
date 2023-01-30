import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _searchString: string | null | undefined = null;
  private _searchString$: Subject<string | null | undefined> = new Subject<string | null | undefined>();

  get searchString() {
    return this._searchString;
  }

  get searchString$() {
    return this._searchString$;
  }

  setSearchPhrase(searchString: string | null | undefined): void {
    this.searchString$.next(searchString);
    this._searchString = searchString;
  }

  constructor() {
  }
}
