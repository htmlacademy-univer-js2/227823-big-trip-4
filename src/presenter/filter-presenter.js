import { render } from '../framework/render.js';
import { FilterType } from '../const.js';
import { Some } from '../utils/filter.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #container = null;
  #filterModel = null;
  #pointsModel = null;

  constructor({ container, filterModel, pointsModel }) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    render(new FilterView({
      activeFilters: this.#getActiveFilters(this.#pointsModel.get()),
      selectedFilter: this.#filterModel.get(),
    }), this.#container);
  }

  #getActiveFilters(points) {
    return Object.values(FilterType).filter((type) => Some[type](points));
  }
}
