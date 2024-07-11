import React from 'react';
import { formatDate } from '@/constants/helper';
import { currentDetailedTransit } from '@/constants/knowledge-base';
import { useTranslations } from 'next-intl';

const TransitTable = () => {
  const t = useTranslations();
  return (
    <table>
      <tbody>
        {Object.keys(currentDetailedTransit).map(item => {
          const currentPlanet = currentDetailedTransit[item];
          return (
            <tr key={currentPlanet.entryDate}>
              <td className="m-2 p-2">
                <strong>{`${t(`nakshatraLord.${item}`)}`}</strong>
              </td>
              <td className="m-2 p-2">{`${formatDate(currentPlanet.entryDate)}`}</td>
              <td className="m-2 p-2">{`${formatDate(currentPlanet.exitDate)}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(TransitTable);
