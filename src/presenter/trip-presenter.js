import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #sortView = null;
  #pointListView = null;
  #emptyListView = null;
  #points = [];
  #pointPresenters = new Map();

  constructor({ container, destinationsModel, offersModel, pointsModel, filterModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#sortView = new SortView();
    this.#points = [...this.#pointsModel.get()];
    this.#pointListView = new PointListView();
    this.#emptyListView = new PointListEmptyView({ filter: this.#filterModel.get() });
    if (this.#points.length) {
      this.#renderTrip();
    } else {
      render(this.#emptyListView, this.#container);
    }
  }

  #renderTrip() {
    render(this.#sortView, this.#container);
    render(this.#pointListView, this.#container);
    this.#renderPoints();
  }

  #renderPoints() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#pointListView.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      pointsModel: this.#pointsModel,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
