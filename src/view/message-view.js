import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class MessageView extends AbstractView {
  #filter = null;
  #isLoading = false;
  #isLoadingError = false;

  constructor({ filter, isLoading, isLoadingError }) {
    super();
    this.#filter = filter;
    this.#isLoading = isLoading;
    this.#isLoadingError = isLoadingError;
  }

  get template() {
    return this.#isLoading || this.#isLoadingError
      ? createLoadingTemplate(this.#isLoadingError)
      : createFilterTemplate(this.#filter);
  }
}

function createLoadingTemplate(isError) {
  const message = isError
    ? 'Failed to load latest route information'
    : 'Loading...';
  return createMessageTemplate(message);
}

function createFilterTemplate(filter) {
  const message = filter === FilterType.EVERYTHING
    ? 'Click New Event to create your first point'
    : `There are no ${filter} events now`;
  return createMessageTemplate(message);
}

function createMessageTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}
