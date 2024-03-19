import AbstractView from '../framework/view/abstract-view';

export default class PointListView extends AbstractView {
  get template() {
    return createEventListViewTemplate();
  }
}

function createEventListViewTemplate() {
  return /* html */ `
    <ul class="trip-events__list"></ul>
  `;
}
