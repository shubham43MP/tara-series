'use client';
import RashifalChart from '@/components/Chart/RashifalChart';
import Dropdown from '@/components/Dropdown';
import TransitTable from '@/components/TransitTable';
import { zodiacSign } from '@/constants/helper';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useLatestData } from '@/components/TransitTable/tableApi';
import { convertTransitData } from '@/constants/knowledge-base';

interface IRashiFalData {
  [key: number]: {
    id: number;
    planets: string[];
  };
}

const ChartContainer = () => {
  const { latestData } = useLatestData();

  console.log({ msg: 'inside page', data: latestData });

  const transitBasedChakra = (ascendant: number) => {
    let resultant: IRashiFalData = {};
    let zodiac = ascendant;
    const currentCalculatedTransit = convertTransitData(latestData);
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

  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const asc = searchparams.get('asc') ?? 1;
  const moon = searchparams.get('moon') ?? 1;
  const [selectedAscendant, setSelectedAscendant] = useState<number>(
    Number(asc)
  );
  const [selectedMoon, setSelectedMoon] = useState<number>(Number(moon));

  const handleChangeAscendant = (option: number) => {
    const currentPath = pathname + `?asc=${option}&moon=${selectedMoon}`;
    router.replace(currentPath, { scroll: false });
    setSelectedAscendant(option);
  };

  const handleChangeMoon = (option: number) => {
    const currentPath = pathname + `?asc=${selectedAscendant}&moon=${option}`;
    router.replace(currentPath, { scroll: false });
    setSelectedMoon(option);
  };

  const handlePlanetPosition = (selectedValue: number) => {
    if (selectedValue) {
      return transitBasedChakra(selectedValue);
    }
    return null;
  };

  const ascendantPlanetaryPosition = handlePlanetPosition(selectedAscendant);

  const moonPlanetaryPosition = useMemo(
    () => handlePlanetPosition(selectedMoon),
    [selectedMoon]
  );
  return (
    <div className="grid  lg:grid-cols-2 grid-cols-1  gap-5">
      <div className="flex flex-col gap-2 items-center ">
        <Dropdown
          value={Number(asc)}
          options={zodiacSign}
          handleSelect={handleChangeAscendant}
          label={t('generic.selectAscendant')}
        />
        {ascendantPlanetaryPosition && (
          <RashifalChart chartData={ascendantPlanetaryPosition} />
        )}
        {t('chart.asc')}
      </div>
      <div className="flex flex-col gap-2 items-center ">
        <Dropdown
          value={Number(moon)}
          options={zodiacSign}
          handleSelect={handleChangeMoon}
          label={t('generic.selectMoonRashi')}
        />
        {moonPlanetaryPosition && (
          <RashifalChart chartData={moonPlanetaryPosition} />
        )}
        {t('chart.moon')}
      </div>
    </div>
  );
};

const Rashifal = () => {
  return (
    <div className="text-black  p-2 min-h-screen">
      <div className="flex justify-center items-center flex-col">
        <TransitTable />
        <ChartContainer />
      </div>
    </div>
  );
};

export default Rashifal;
