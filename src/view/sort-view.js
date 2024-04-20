import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView {

  #types = null;
  #selected = null;
  #handleTypeChange = null;

  constructor({ types, selected, onTypeChanged }) {
    super();
    this.#types = types;
    this.#selected = selected;
    this.#handleTypeChange = onTypeChanged;
    this.element.addEventListener('change', this.#typeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#types, this.#selected);
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleTypeChange(evt.target.dataset.sortType);
  };
}

function createSortTemplate(types, selected) {
  return /* html */`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${types.map(({ type, enabled }) =>/* html */`
        <div class="trip-sort__item  trip-sort__item--${type}">
          <input id="sort-${type}" class="trip-sort__input  visually-hidden" data-sort-type="${type}" type="radio" name="trip-sort" value="sort-${type}" ${selected === type ? 'checked' : ''} ${enabled ? '' : 'disabled'}>
          <label class="trip-sort__btn" for="sort-${type}">${type}</label>
        </div>
      `).join('')}
    </form>`;
}
