import Observable from '../framework/observable.js';
import { POINT_TYPES } from '../const.js';
import { generatePoint } from '../mock/point.js';
import { getRandomInteger, getRandomValue } from '../utils/common.js';

export default class PointsModel extends Observable {
  #points = [];

  constructor(destinationsModel, offersModel) {
    super();
    const pointCount = { MIN: 0, MAX: 5};
    this.#points = Array.from({ length: getRandomInteger(pointCount.MIN, pointCount.MAX) }, () => {
      const destination = getRandomValue(destinationsModel.get());
      const type = getRandomValue(POINT_TYPES);
      const offers = offersModel.getByType(type).slice(0, getRandomInteger(0, 3));
      return generatePoint(destination.id, type, offers.map((offer) => offer.id));
    });
  }

  get() {
    return this.#points;
  }

  getById(id) {
    return this.#points.find((point) => point.id === id);
  }

  add(updateType, point) {
    this.#points.push(point);
    this._notify(updateType, point);
  }

  update(updateType, point) {
    const index = this.#points.findIndex((current) => current.id === point.id);
    this.#points[index] = point;
    this._notify(updateType, point);
  }

  remove(updateType, point) {
    const index = this.#points.findIndex((current) => current.id === point.id);
    this.#points.splice(index, 1);
    this._notify(updateType, point);
  }
}
