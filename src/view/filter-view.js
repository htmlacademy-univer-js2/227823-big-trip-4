import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';

export default class FilterView extends AbstractView {
  #activeFilters = [];
  #selected = null;
  #handleFilterTypeChange = null;

  constructor({ activeFilters, selectedFilter, onFilterTypeChange }) {
    super();
    this.#activeFilters = activeFilters;
    this.#selected = selectedFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#FilterTypeChangeHandler);
  }

  #FilterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };

  get template() {
    return createFilterTemplate({ activeFilters: this.#activeFilters, selected: this.#selected });
  }
}

function createFilterTemplate({ activeFilters, selected }) {
  return /* html */`
    <form class="trip-filters" action="#" method="get">
      ${Object.values(FilterType).map((filter) => createFilter(filter, activeFilters.includes(filter), filter === selected)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;

  function createFilter(filter, enabled, checked) {
    return /* html */`
      <div class="trip-filters__filter">
        <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" data-filter-type="${filter}" value="${filter}" ${enabled ? '' : 'disabled'} ${checked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filter}">${capitalizeFirstLetter(filter)}</label>
      </div>`;
  }
}
