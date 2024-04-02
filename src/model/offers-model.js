import { POINT_TYPES } from '../const.js';
import { generateOffersByType } from '../mock/offer.js';

export default class OffersModel {

  constructor() {
    this.offers = POINT_TYPES.map((type) => generateOffersByType(type));
  }

  get() {
    return this.offers;
  }

  getByType(type) {
    return this.offers.find((offersList) => offersList.type === type).offers;
  }

  getById(type, id) {
    return this.getByType(type).offers.find((offer) => offer.if === id).offers;
  }

}
