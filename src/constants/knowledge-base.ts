/**
 * A repo of debilitation and exhaltation of planets in zodiac
 */

const planetStates = {
  jupiter: {
    debilitation: 10,
    exhaltation: 4
  },
  mars: {
    debilitation: 4,
    exhaltation: 10
  },
  sun: {
    debilitation: 7,
    exhaltation: 1
  },
  saturn: {
    debilitation: 1,
    exhaltation: 7
  },
  venus: {
    debilitation: 6,
    exhaltation: 12
  },
  mercury: {
    debilitation: 12,
    exhaltation: 6
  },
  moon: {
    debilitation: 8,
    exhaltation: 2
  }
};

export interface TransitDetails {
  id?: number;
  zodiac: number;
  entryDate: string;
  exitDate: string;
}

interface CurrentDetailedTransit {
  [key: string]: TransitDetails;
}

interface CurrentTransitData {
  [key: number]: string[];
}

/**
 * This function will retun mappable planets in this format
  '2': ['jupiter'],
  '11': ['saturn'],
  '12': ['rahu'],
  '6': ['ketu'],
  '3': ['sun']
 */

const convertTransitData = (
  detailedTransit: CurrentDetailedTransit
): CurrentTransitData => {
  const transitData: CurrentTransitData = {};

  for (const planet in detailedTransit) {
    const { zodiac } = detailedTransit[planet];
    if (!transitData[zodiac]) {
      transitData[zodiac] = [];
    }
    transitData[zodiac].push(planet);
  }

  return transitData;
};

export { convertTransitData, planetStates };
