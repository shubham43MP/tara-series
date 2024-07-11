/**
 * A repo of debilitation and exhaltation of planets in zodiac
 */
export const planetStates = {
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

export const currentDetailedTransit: CurrentDetailedTransit = {
  jupiter: {
    zodiac: 2,
    entryDate: '2024-05-01',
    exitDate: '2025-05-09'
  },
  venus: {
    zodiac: 5,
    entryDate: '2024-07-01',
    exitDate: '2024-08-13'
  },
  saturn: {
    zodiac: 11,
    entryDate: '2023-01-17',
    exitDate: '2025-03-29'
  },
  rahu: {
    zodiac: 12,
    entryDate: '2023-10-30',
    exitDate: '2025-04-18'
  },
  ketu: {
    zodiac: 6,
    entryDate: '2023-10-30',
    exitDate: '2025-04-18'
  }
};

/**
 * This function will retun mappable planets in this format
  '2': ['jupiter'],
  '11': ['saturn'],
  '12': ['rahu'],
  '6': ['ketu'],
  '3': ['sun']
 */

export const convertTransitData = (
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
