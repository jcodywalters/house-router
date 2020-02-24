import { GoogleMapsClient } from './services/GoogleMaps'

const googleMapsClient = new GoogleMapsClient();


/**
 * Creates optimized list of houses in shortest distance order
 * @param {String} origin - ex: 'address1'
 * @param {Array} destinations - ex: ['address2', 'address3']
 * @returns {String} address that is shortest distance from origin
 */
async function getShortestDistance(origin, destinations) {
  const elements = await googleMapsClient.getDistances(origin, destinations);
  let shortestDistance = Number.MAX_VALUE;
  let shortestDistanceIndex;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const distance = element.distance.value;
    if (distance < shortestDistance) {
      shortestDistance = distance;
      shortestDistanceIndex = i;
    }
  }
  return destinations[shortestDistanceIndex];
}

/**
 * Creates an optimized list from an origin and destinations 
 * @param {String} origin
 * @param {Array} destinations 
 * @returns {Array} - List of address in order of shortest distance from the previous origin
 */
async function compileList(origin, destinations) {
  let optimizedList = [];
  let currentOrigin = origin;
  optimizedList.push(currentOrigin);
  while (destinations.length >= 1) {
    const nextDestination = await getShortestDistance(currentOrigin, destinations);
    optimizedList.push(nextDestination);
    destinations.splice(destinations.indexOf(nextDestination), 1)
    currentOrigin = nextDestination;
  }
  return optimizedList;
}

/**
 * Entry Point
 * @param {Object} event 
 * @param {Object} _context 
 */
async function handler(event, _context) {
  const origins = '6259 S 153rd St';
  const destinations = [
    '13905 56th Pl S',
    '15146 65th Ave S',
    '15146 65th Ave S #503',
    '15210 Macadam Rd S D103',
    '15156 65th Ave S #1007',
    '14921 58th Ave S',
    '14218 53rd Ave S',
  ];
  const result = await compileList(origins, destinations);
  console.log('!! ', result, '!!');
  return result;
}

module.exports = { handler }