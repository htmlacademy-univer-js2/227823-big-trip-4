import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';

import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel(destinationsModel, offersModel);

const filterPresenter = new FilterPresenter({container: filterContainer});
const tripPresenter = new TripPresenter({
  container: tripContainer,
  destinationsModel,
  offersModel,
  pointsModel
});

filterPresenter.init();
tripPresenter.init();
