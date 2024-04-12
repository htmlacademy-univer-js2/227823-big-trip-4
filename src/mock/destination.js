import { getRandomInteger, shuffle } from '../utils/common.js';
import { CITIES, DESCRIPTION } from './const.js';


const cities = shuffle([...CITIES]);

function generateDestination() {
  const city = cities.pop();
  const maxPictures = 5;

  return {
    id: crypto.randomUUID(),
    name: city,
    description: `${city} description: ${DESCRIPTION}`,
    pictures: Array.from({ length: getRandomInteger(0, maxPictures) }, generatePicture),
  };

  function generatePicture() {
    return {
      'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      'description': `${city} description`
    };
  }
}

export { generateDestination };
