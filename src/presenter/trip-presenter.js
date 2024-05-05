import { remove, render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter, { PointMode } from './point-presenter.js';
import { ENABLED_SORT_TYPES, SortTypes, UpdateType, UserAction } from '../const.js';
import { sort } from '../utils/sort.js';
import { filter } from '../utils/filter.js';

export default class TripPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #sortView = null;
  #pointListView = new PointListView();
  #emptyListView = null;
  #pointPresenters = new Map();
  #openedEditPointId = null;
  #currentSortType = SortTypes.DAY;

  constructor({ container, destinationsModel, offersModel, pointsModel, filterModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  init() {
    this.#renderTrip();
  }

  get points() {
    const filterType = this.#filterModel.get();
    const filteredPoints = filter[filterType](this.#pointsModel.get());
    return sort[this.#currentSortType](filteredPoints);
  }

  #renderTrip() {
    const points = this.points;
    if (points.length === 0) {
      this.#renderEmptyListView();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints(points);
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

  #renderEmptyListView() {
    this.#emptyListView = new PointListEmptyView({ filter: this.#filterModel.get() });
    render(this.#emptyListView, this.#container);
  }

  #renderPointsList() {
    render(this.#pointListView, this.#container);
  }

  #renderPoints(points) {
    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i]);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#pointListView.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#viewActionHandler,
      onModeChange: this.#modeChangeHandler,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearTrip() {
    this.#clearPoints();
    remove(this.#sortView);
    remove(this.#emptyListView);
    this.#sortView = null;
    this.#emptyListView = null;
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#openedEditPointId = null;
  }

  #sortTypeChangeHandler = (type) => {
    this.#currentSortType = type;
    this.#clearTrip();
    this.#renderTrip();
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

  #viewActionHandler = (actionType, updateType, data) => {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#pointsModel.add(updateType, data);
        break;
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, data);
        break;
      case UserAction.REMOVE_POINT:
        this.#pointsModel.remove(updateType, data);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#currentSortType = SortTypes.DAY;
        this.#clearTrip();
        this.#renderTrip();
        break;
    }
  };
}
