import { PointMode } from '../const';
import { remove, render, replace } from '../framework/render';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';

export default class PointPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #point = null;
  #pointDefaultView = null;
  #pointEditView = null;
  #mode = PointMode.DEFAULT;

  constructor({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init(point) {
    const prevPointDefaultView = this.#pointDefaultView;
    const prevPointEditView = this.#pointEditView;
    this.#point = point;
    this.#pointDefaultView = new PointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDown);
      }
    });
    this.#pointEditView = new EditPointView({
      point,
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
      onFormSubmit: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDown);
      },
      onResetClick: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDown);
      }
    });

    if (prevPointDefaultView === null || prevPointEditView === null) {
      render(this.#pointDefaultView, this.#container);
      return;
    }

    if (this.#mode === PointMode.DEFAULT) {
      replace(this.#pointDefaultView, prevPointDefaultView);
    } else {
      replace(this.#pointEditView, prevPointEditView);
    }

    remove(prevPointDefaultView);
    remove(prevPointEditView);
  }

  resetView() {
    if (this.#mode === PointMode.EDIT) {
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointDefaultView);
    remove(this.#pointEditView);
  }

  #replacePointToForm() {
    replace(this.#pointEditView, this.#pointDefaultView);
  }

  #replaceFormToPoint() {
    replace(this.#pointDefaultView, this.#pointEditView);
  }

  #escKeyDown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.removeEventListener('keydown', this.#escKeyDown);
      this.#replaceFormToPoint();
    }
  }
}
