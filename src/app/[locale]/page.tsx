'use client';
import AutoCompleteSelect from '@/components/AutoComplete';
import NakshatraLordTable from '@/components/Table/NakshatraLordTable';
import NakshatraTable from '@/components/Table/NakshatraTable';
import NavtaraTable from '@/components/Table/NavtaraTable';
import {
  APP_ROUTES,
  nakshatraList,
  taraChakra,
  transposeArray
} from '@/constants/helper';
import Images from '@/constants/images';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface Nakshatra {
  id: number;
  name: string;
  lord: string;
}

export default function Home() {
  const [orderedNakshatra, setOrderedNakshatra] =
    useState<Nakshatra[]>(nakshatraList);
  const [selectedNakshatra, setSelectedNakshatra] = useState<{
    value: number;
    label: string;
  }>({
    value: 0,
    label: ''
  });
  const t = useTranslations();
  const router = useRouter();

  const handleSelect = (selectedOption: { value: number; label: string }) => {
    setSelectedNakshatra(selectedOption);
    const index = nakshatraList.findIndex(
      nak => nak.id === selectedOption.value
    );
    const reordered = [
      ...nakshatraList.slice(index),
      ...nakshatraList.slice(0, index)
    ];
    setOrderedNakshatra(reordered);
  };

  const transposedNakshatra = useMemo(
    () => transposeArray(orderedNakshatra),
    [orderedNakshatra]
  );

  const uniqueLords = useMemo(() => {
    const rulingLordUnique: string[] = [];
    transposedNakshatra.forEach(col => {
      const lordsInCol = Array.from(
        new Set(col.map(nakshatra => nakshatra.lord))
      );
      lordsInCol.forEach(lord => {
        if (!rulingLordUnique.includes(lord)) {
          rulingLordUnique.push(lord);
        }
      });
    });
    return rulingLordUnique;
  }, [transposedNakshatra]);

  console.log('s');

  return (
    <main className="flex relative h-screen justify-center flex-col gap-10 items-center">
      <Image
        className=" absolute inset-0 -z-30 w-screen blur-xl h-full object-cover"
        alt="background"
        src={Images.backgroundImage2}
      />
      <div>
        <AutoCompleteSelect
          options={nakshatraList.map(nak => ({
            value: nak.id,
            label: nak.name
          }))}
          handleSelect={handleSelect}
          searchPlaceholder={t('generic.searchConstellation')}
        />
        {selectedNakshatra.label.length > 0 && (
          <p className="text-center mt-2">
            Your birth constellation:{' '}
            {t(`nakshatraList.${selectedNakshatra.label}`)}
          </p>
        )}
      </div>
      <div className="tables flex items-center gap-5">
        <NavtaraTable taraChakra={taraChakra} />
        <NakshatraTable transposedNakshatra={transposedNakshatra} />
        <NakshatraLordTable uniqueLords={uniqueLords} />
      </div>
    </main>
  );
}
