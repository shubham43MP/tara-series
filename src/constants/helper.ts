import { convertTransitData, currentDetailedTransit } from './knowledge-base';

interface IRashiFalData {
  [key: number]: {
    id: number;
    planets: string[];
  };
}
interface INakshatra {
  id: number;
  name: string;
  lord: string;
}

const taraChakra: string[] = [
  'janma',
  'sampat',
  'vipat',
  'kshema',
  'pratyari',
  'sadhak',
  'vadha',
  'mitra',
  'atimitra'
];

const zodiacSign: { label: string; value: number }[] = [
  { label: 'aries', value: 1 },
  { label: 'taurus', value: 2 },
  { label: 'gemini', value: 3 },
  { label: 'cancer', value: 4 },
  { label: 'leo', value: 5 },
  { label: 'virgo', value: 6 },
  { label: 'libra', value: 7 },
  { label: 'scorpio', value: 8 },
  { label: 'sagittarius', value: 9 },
  { label: 'capricorn', value: 10 },
  { label: 'aquarius', value: 11 },
  { label: 'pisces', value: 12 }
];
const nakshatraList: INakshatra[] = [
  { id: 1, name: 'ashwini', lord: 'ketu' },
  { id: 2, name: 'bharani', lord: 'venus' },
  { id: 3, name: 'krittika', lord: 'sun' },
  { id: 4, name: 'rohini', lord: 'moon' },
  { id: 5, name: 'mrigashira', lord: 'mars' },
  { id: 6, name: 'ardra', lord: 'rahu' },
  { id: 7, name: 'punarvasu', lord: 'jupiter' },
  { id: 8, name: 'pushya', lord: 'saturn' },
  { id: 9, name: 'ashlesha', lord: 'mercury' },
  { id: 10, name: 'magha', lord: 'ketu' },
  { id: 11, name: 'purvaPhalguni', lord: 'venus' },
  { id: 12, name: 'uttaraPhalguni', lord: 'sun' },
  { id: 13, name: 'hasta', lord: 'moon' },
  { id: 14, name: 'chitra', lord: 'mars' },
  { id: 15, name: 'swati', lord: 'rahu' },
  { id: 16, name: 'vishakha', lord: 'jupiter' },
  { id: 17, name: 'anuradha', lord: 'saturn' },
  { id: 18, name: 'jyeshtha', lord: 'mercury' },
  { id: 19, name: 'mula', lord: 'ketu' },
  { id: 20, name: 'purvaAshadha', lord: 'venus' },
  { id: 21, name: 'uttaraAshadha', lord: 'sun' },
  { id: 22, name: 'shravana', lord: 'moon' },
  { id: 23, name: 'dhanishta', lord: 'mars' },
  { id: 24, name: 'shatabhisha', lord: 'rahu' },
  { id: 25, name: 'purvaBhadrapada', lord: 'jupiter' },
  { id: 26, name: 'uttaraBhadrapada', lord: 'saturn' },
  { id: 27, name: 'revati', lord: 'mercury' }
];

const planetList: { label: string; value: string }[] = [
  { label: 'sun', value: 'Su' },
  { label: 'moon', value: 'Mo' },
  { label: 'mars', value: 'Ma' },
  { label: 'mercury', value: 'Me' },
  { label: 'jupiter', value: 'Ju' },
  { label: 'venus', value: 'Ve' },
  { label: 'saturn', value: 'Sa' },
  { label: 'rahu', value: 'Ra' },
  { label: 'ketu', value: 'Ke' }
];

const rashifalzero: IRashiFalData = {
  1: { id: 5, planets: ['ketu'] },
  2: { id: 6, planets: ['sun'] },
  3: { id: 7, planets: ['moon'] },
  4: { id: 8, planets: ['mercury'] },
  5: { id: 9, planets: ['moon', 'sun', 'mars', 'jupiter', 'saturn'] },
  6: { id: 10, planets: ['ketu'] },
  7: { id: 11, planets: ['ketu'] },
  8: { id: 12, planets: ['ketu'] },
  9: { id: 1, planets: ['ketu'] },
  10: { id: 2, planets: ['ketu'] },
  11: { id: 3, planets: ['ketu'] },
  12: { id: 4, planets: ['ketu'] }
};
const rashifal1: IRashiFalData = {
  1: { id: 5, planets: ['ketu'] },
  2: { id: 6, planets: ['sun'] },
  3: { id: 7, planets: ['moon'] },
  4: { id: 8, planets: ['mercury'] },
  5: {
    id: 9,
    planets: [
      'moon',
      'sun',
      'mars',
      'mars',
      'mars',
      'mars',
      'mars',
      'jupiter',
      'saturn'
    ]
  },
  6: { id: 10, planets: ['ketu'] },
  7: { id: 11, planets: ['ketu'] },
  8: { id: 12, planets: ['ketu'] },
  9: { id: 1, planets: ['ketu'] },
  10: { id: 2, planets: ['ketu'] },
  11: { id: 3, planets: ['ketu'] },
  12: { id: 4, planets: ['ketu'] }
};

export const transitBasedChakra = (ascendant: number) => {
  let resultant: IRashiFalData = {};
  let zodiac = ascendant;
  const currentCalculatedTransit = convertTransitData(currentDetailedTransit);
  for (let house = 1; house <= 12; house++) {
    resultant = {
      ...resultant,
      [house]: {
        id: zodiac,
        planets: currentCalculatedTransit[zodiac] || []
      }
    };
    if (zodiac === 12) {
      zodiac = 1;
    } else zodiac++;
  }
  return resultant;
};

const transposeArray = <T>(array: T[]): T[][] => {
  const transposed: T[][] = [[], [], []];
  array.forEach((item, index) => {
    const col = Math.floor(index / 9);
    transposed[col].push(item);
  });
  return transposed;
};

const APP_ROUTES = {
  TRANSIT: '/transit',
  TARASERIES: '/tara-series'
};

/**
 *
 * convert the date format from "YYYY-MM-DD" to "D MMMM YYYY"
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export {
  nakshatraList,
  taraChakra,
  planetList,
  rashifalzero,
  rashifal1,
  zodiacSign,
  APP_ROUTES,
  formatDate,
  transposeArray
};
