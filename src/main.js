import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';

import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';


const filterContainer = document.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel(destinationsModel, offersModel);

const filterPresenter = new FilterPresenter({container: filterContainer});
const boardPresenter = new BoardPresenter({
  container: boardContainer,
  destinationsModel,
  offersModel,
  pointsModel
});

filterPresenter.init();
boardPresenter.init();
