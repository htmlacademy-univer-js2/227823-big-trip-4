import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';

import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointCreationStateModel from './model/point-creation-state-model.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';

const headerTripContainer = document.querySelector('.trip-main');
const filterContainer = headerTripContainer.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel(destinationsModel, offersModel);
const filterModel = new FilterModel();
const pointCreationStateModel = new PointCreationStateModel();

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  filterModel,
  pointsModel,
});
const newPointButtonPresenter = new NewPointButtonPresenter({
  container: headerTripContainer,
  pointCreationStateModel
});
const tripPresenter = new TripPresenter({
  container: tripContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  pointCreationStateModel,
});

filterPresenter.init();
newPointButtonPresenter.init();
tripPresenter.init();
