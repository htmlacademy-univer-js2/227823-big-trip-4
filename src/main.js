import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';

import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import { getRandomFilter } from './mock/filter.js';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel(destinationsModel, offersModel);
const filterModel = new FilterModel();
filterModel.set(getRandomFilter());

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  filterModel,
  pointsModel,
});
const tripPresenter = new TripPresenter({
  container: tripContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
});

filterPresenter.init();
tripPresenter.init();
