import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #sortView = null;
  #pointListView = null;
  #points = [];

  constructor({ container, destinationsModel, offersModel, pointsModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#sortView = new SortView();
    this.#pointListView = new PointListView();
    this.#points = [...this.#pointsModel.get()];
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#sortView, this.#container);
    render(this.#pointListView, this.#container);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const pointDestination = this.#destinationsModel.getById(point.destination);
    const pointOffers = this.#offersModel.getByType(point.type);
    const pointView = new PointView({ point, pointDestination, pointOffers });
    render(pointView, this.#pointListView.element);
  }
}
