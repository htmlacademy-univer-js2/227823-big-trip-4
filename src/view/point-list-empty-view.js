import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PointListEmptyView extends AbstractView {
  #filter = null;

  constructor({ filter }) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate({ filter: this.#filter });
  }
}

function createFilterTemplate({ filter }) {
  const message = filter === FilterType.EVERYTHING
    ? 'Click New Event to create your first point'
    : `There are no ${filter} events now`;
  return `<p class="trip-events__msg">${message}</p>`;
}
