import { useState, useEffect } from 'react';

const defaultData = {
  jupiter: {
    id: 0,
    zodiac: 7,
    entryDate: '2024-05-01',
    exitDate: '2025-05-09'
  },
  venus: { id: 1, zodiac: 5, entryDate: '2024-07-01', exitDate: '2024-08-13' },
  saturn: {
    id: 2,
    zodiac: 11,
    entryDate: '2023-01-17',
    exitDate: '2025-03-29'
  },
  rahu: { id: 3, zodiac: 12, entryDate: '2023-10-30', exitDate: '2025-04-18' },
  ketu: { id: 4, zodiac: 6, entryDate: '2023-10-30', exitDate: '2025-04-18' }
};

// ✅ Fetch function that works OUTSIDE React components
const fetchLatestData = async () => {
  try {
    const res = await fetch('http://localhost:3000/locale/api/webhook', {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return data.latestData || defaultData;
  } catch (error) {
    console.error('Error fetching latest data:', error);
    return defaultData;
  }
};

// ✅ React Hook for components
export const useLatestData = () => {
  const [latestData, setLatestData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const newData = await fetchLatestData();
        setLatestData(newData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []); // ✅ Fetches once when the component mounts

  return { latestData, loading, error };
};
