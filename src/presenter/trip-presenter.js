import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class TripPresenter {
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
    this.#renderTrip();
  }

  #renderTrip() {
    render(this.#sortView, this.#container);
    render(this.#pointListView, this.#container);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint(point) {
    const pointDestination = this.#destinationsModel.getById(point.destination);
    const pointOffers = this.#offersModel.getByType(point.type);

    const pointView = new PointView({
      point,
      pointDestination,
      pointOffers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDown);
      }
    });
    const editView = new EditPointView({
      point,
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDown);
      },
      onResetClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDown);
      }
    });

    function replacePointToForm() {
      replace(editView, pointView);
    }
    function replaceFormToPoint() {
      replace(pointView, editView);
    }
    function escKeyDown(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        document.removeEventListener('keydown', escKeyDown);
        replaceFormToPoint();
      }
    }

    render(pointView, this.#pointListView.element);
  }
}
