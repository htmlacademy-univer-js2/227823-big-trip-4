import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class FilterModel extends Observable {

  #filter = FilterType.EVERYTHING;

  get() {
    return this.#filter;
  }

  set(filterType) {
    this.#filter = filterType;
    // TODO this._notify
  }

}


