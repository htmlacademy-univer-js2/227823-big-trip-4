import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';

const filterContainer = document.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');

const filterPresenter = new FilterPresenter({container: filterContainer});
const boardPresenter = new BoardPresenter({container: boardContainer});

filterPresenter.init();
boardPresenter.init();
