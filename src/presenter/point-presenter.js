import { remove, render, replace } from '../framework/render';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';

export const PointMode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

export default class PointPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #point = null;
  #pointDefaultView = null;
  #pointEditView = null;
  #mode = PointMode.DEFAULT;

  constructor({ container, pointsModel, destinationsModel, offersModel, onDataChange, onModeChange }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    const prevPointDefaultView = this.#pointDefaultView;
    const prevPointEditView = this.#pointEditView;
    this.#point = point;
    this.#pointDefaultView = new PointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#editClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });
    this.#pointEditView = new EditPointView({
      point,
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
      onFormSubmit: this.#formSubmitHandler,
      onFormCancel: this.#formCancelHandler,
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
    this.#mode = PointMode.EDIT;
    document.addEventListener('keydown', this.#escKeyDown);
    this.#handleModeChange(this.#point.id, this.#mode);
    replace(this.#pointEditView, this.#pointDefaultView);
  }

  #replaceFormToPoint() {
    this.#mode = PointMode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDown);
    this.#handleModeChange(this.#point.id, this.#mode);
    replace(this.#pointDefaultView, this.#pointEditView);
  }

  #editClickHandler = () => {
    this.#replacePointToForm();
  };

  #formSubmitHandler = () => {
    this.#replaceFormToPoint();
  };

  #formCancelHandler = () => {
    this.#replaceFormToPoint();
  };

  #escKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };
}
