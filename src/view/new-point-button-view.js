import AbstractView from '../framework/view/abstract-view';

export default class NewPointButtonView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  get disabled(){
    return this.element.disabled;
  }

  set disabled(value) {
    this.element.disabled = value;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
function createNewPointButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}
