import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {
  #container;
  #destinationsModel;
  #offersModel;
  #pointsModel;

  constructor({ container, destinationsModel, offersModel, pointsModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    render(new SortView(), this.#container);

    const eventList = new PointListView();
    render(eventList, this.#container);

    const points = [...this.#pointsModel.get()];
    render(new EditPointView({
      point: points[0],
      pointDestination: this.#destinationsModel.getById(points[0].destination),
      pointOffers: this.#offersModel.getByType(points[0].type)
    }), eventList.element);

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      const pointDestination = this.#destinationsModel.getById(point.destination);
      const pointOffers = this.#offersModel.getByType(point.type);
      const pointView = new PointView({ point, pointDestination, pointOffers });
      render(pointView, eventList.element);
    }
  }
}
