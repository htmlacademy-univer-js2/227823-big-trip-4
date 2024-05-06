import { render } from '../framework/render';
import NewPointButtonView from '../view/new-point-button-view';

export default class NewPointButtonPresenter {
  #container = null;
  #pointCreationStateModel = null;
  #button = null;

  constructor({ container, pointCreationStateModel }) {
    this.#container = container;
    this.#pointCreationStateModel = pointCreationStateModel;
  }

  init() {
    this.#button = new NewPointButtonView({ onClick: this.#buttonClickHandler });
    this.#pointCreationStateModel.addObserver(this.#pointCreationStateChangeHandler);
    render(this.#button, this.#container);
  }

  #buttonClickHandler = () => {
    this.#pointCreationStateModel.isCreating = true;
  };

  #pointCreationStateChangeHandler = (isCreating) => {
    this.#button.disabled = isCreating;
  };
}
