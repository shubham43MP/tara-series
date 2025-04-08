import React from 'react';
import { formatDate } from '@/constants/helper';
import { useTranslations } from 'next-intl';
import { useLatestData } from './tableApi';

const TransitTable = () => {
  const t = useTranslations();
  const { latestData, loading, error } = useLatestData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table>
      <tbody>
        {(Object.keys(latestData) as Array<keyof typeof latestData>).map(
          item => {
            const currentPlanet = latestData[item];
            return (
              <tr key={currentPlanet.id}>
                <td className="m-2 p-2">
                  <strong>{t(`nakshatraLord.${item}`)}</strong>
                </td>
                <td className="m-2 p-2">
                  {formatDate(currentPlanet.entryDate)}
                </td>
                <td className="m-2 p-2">
                  {formatDate(currentPlanet.exitDate)}
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default TransitTable;
