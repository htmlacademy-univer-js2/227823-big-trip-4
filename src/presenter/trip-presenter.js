import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter, { PointMode } from './point-presenter.js';

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
  #openedEditPointId = null;

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
      onDataChange: this.#pointChangeHandler,
      onModeChange: this.#modeChangeHandler,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #modeChangeHandler = (id, mode) => {
    if (mode === PointMode.DEFAULT) {
      this.#openedEditPointId = null;
    } else {
      if (this.#openedEditPointId !== null) {
        this.#pointPresenters.get(this.#openedEditPointId).resetView();
      }
      this.#openedEditPointId = id;
    }
  };

  #pointChangeHandler = (updatePoint) => {
    const index = this.#points.findIndex((point) => point.id === updatePoint.id);
    this.#points[index] = updatePoint;
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };
}
