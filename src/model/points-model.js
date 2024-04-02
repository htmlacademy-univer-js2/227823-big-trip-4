import { POINT_TYPES } from '../const.js';
import { generatePoint } from '../mock/point.js';
import { getRandomInteger, getRandomValue } from '../utils/common.js';

export default class PointsModel {

  constructor(destinationsModel, offersModel) {
    const pointCount = 10;

    this.points = Array.from({ length: pointCount }, () => {
      const destination = getRandomValue(destinationsModel.get());
      const type = getRandomValue(POINT_TYPES);
      const offers = offersModel.getByType(type).slice(0, getRandomInteger(0, 3));
      return generatePoint(destination.id, type, offers.map((offer) => offer.id));
    });
  }

  get() {
    return this.points;
  }

  getById(id) {
    return this.points.find((point) => point.id === id);
  }

}
