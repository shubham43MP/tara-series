import { Nakshatra } from '@/constants/common.types';
import { useTranslations } from 'next-intl';
import React from 'react';

interface NakshatraTableProps {
  transposedNakshatra: Nakshatra[][];
}

interface Col {
  id: React.Key | null | undefined;
  name: string;
}

const NakshatraTable = ({ transposedNakshatra }: NakshatraTableProps) => {
  const t = useTranslations('nakshatraList');

  return (
    <div>
      <p className="text-center text-2xl font-semibold">{t('title')}</p>
      <div className="grid grid-cols-3 gap-2">
        {transposedNakshatra.map(
          (col: Col[], colIndex: React.Key | null | undefined) => (
            <div key={colIndex} className="flex flex-col">
              {col.map((nakshatra: Col) => (
                <div
                  className="border border-purple-500 p-2 w-60 text-center"
                  key={nakshatra.id}
                >
                  {`${t(nakshatra.name)} ${nakshatra.id}`}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NakshatraTable;
