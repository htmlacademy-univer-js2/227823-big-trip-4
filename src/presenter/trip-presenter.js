import { remove, render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter, { PointMode } from './point-presenter.js';
import { ENABLED_SORT_TYPES, SortTypes } from '../const.js';
import { sort } from '../utils/sort.js';

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
  #currentSortType = SortTypes.DAY;

  constructor({ container, destinationsModel, offersModel, pointsModel, filterModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#points = sort[this.#currentSortType]([...this.#pointsModel.get()]);
    this.#pointListView = new PointListView();
    this.#emptyListView = new PointListEmptyView({ filter: this.#filterModel.get() });
    if (this.#points.length) {
      this.#renderTrip();
    } else {
      render(this.#emptyListView, this.#container);
    }
  }

  #renderTrip() {
    this.#renderSort();
    render(this.#pointListView, this.#container);
    this.#renderPoints();
  }

  #renderSort() {
    const prevSortView = this.#sortView;
    const sortTypes = Object.values(SortTypes).map((type) => ({
      type: type,
      enabled: ~ENABLED_SORT_TYPES.indexOf(type),
    }));
    this.#sortView = new SortView({
      types: sortTypes,
      selected: this.#currentSortType,
      onTypeChanged: this.#sortTypeChangeHandler
    });
    if (prevSortView) {
      replace(this.#sortView, prevSortView);
      remove(prevSortView);
    } else {
      render(this.#sortView, this.#container);
    }
  }

  #sortPoints(type) {
    this.#currentSortType = type;
    this.#points = sort[type](this.#points);
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

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#openedEditPointId = null;
  }

  #sortTypeChangeHandler = (type) => {
    this.#sortPoints(type);
    this.#clearPointList();
    this.#renderSort();
    this.#renderPoints();
  };

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
