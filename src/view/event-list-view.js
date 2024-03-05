import { createElement } from '../render';

export default class EventListView {
  getTemplate() {
    return createEventListViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

function createEventListViewTemplate() {
  return /* html */ `
    <ul class="trip-events__list"></ul>
  `;
}
