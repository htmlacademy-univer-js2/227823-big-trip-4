import { UpdateType, UserAction } from '../const';
import { remove, render, replace } from '../framework/render';
import { isBigDifference } from '../utils/point';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';

export const PointMode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

export default class PointPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #point = null;
  #pointDefaultView = null;
  #pointEditView = null;
  #mode = PointMode.DEFAULT;

  constructor({ container, destinationsModel, offersModel, onDataChange, onModeChange }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
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
      onFormReset: this.#deleteClickHandler,
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
      this.#pointEditView.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointDefaultView);
    remove(this.#pointEditView);
  }

  #replacePointToForm() {
    this.#mode = PointMode.EDIT;
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange(this.#point.id, this.#mode);
    replace(this.#pointEditView, this.#pointDefaultView);
  }

  #replaceFormToPoint() {
    this.#mode = PointMode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange(this.#point.id, this.#mode);
    replace(this.#pointDefaultView, this.#pointEditView);
  }

  #editClickHandler = () => {
    this.#replacePointToForm();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };

  #formSubmitHandler = (updatePoint) => {
    const isMinor = isBigDifference(this.#point, updatePoint);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinor ? UpdateType.MINOR : UpdateType.PATCH,
      updatePoint
    );

    this.#replaceFormToPoint();
  };

  #deleteClickHandler = (updatePoint) => {
    this.#handleDataChange(
      UserAction.REMOVE_POINT,
      UpdateType.MINOR,
      updatePoint
    );
  };

  #formCancelHandler = () => {
    this.#pointEditView.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditView.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };
}
