import { render } from '../render';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-point-view.js';
import NewPointView from '../view/new-point-view.js';

export default class BoardPresenter {
  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(new SortView(), this.container);
    const eventList = new EventListView();
    render(eventList, this.container);
    render(new NewPointView(), eventList.getElement());
    const pointsCount = 3;
    for (let i = 0; i < pointsCount; i++) {
      render(new EventItemView(), eventList.getElement());
    }
  }
}
