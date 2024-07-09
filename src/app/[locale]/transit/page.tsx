'use client';
import RashifalChart from '@/components/Chart/RashifalChart';
import Dropdown from '@/components/Dropdown';
import { transitBasedChakra, zodiacSign } from '@/constants/helper';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const Rashifal = () => {
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
    setSelectedAscendant(option);
    const currentPath = pathname + `?asc=${option}&moon=${selectedMoon}`;
    router.replace(currentPath);
  };

  const handleChangeMoon = (option: number) => {
    setSelectedMoon(option);
    const currentPath = pathname + `?asc=${selectedAscendant}&moon=${option}`;
    router.replace(currentPath);
  };

  const handlePlanetPosition = (selectedValue: number) => {
    if (selectedValue) {
      return transitBasedChakra(selectedValue);
    }
    return null;
  };

  const ascendantPlanetaryPosition = useMemo(
    () => handlePlanetPosition(selectedAscendant),
    [selectedAscendant]
  );

  const moonPlanetaryPosition = useMemo(
    () => handlePlanetPosition(selectedMoon),
    [selectedMoon]
  );

  return (
    <div className="text-black  p-2 min-h-screen">
      <div className="flex justify-center items-center flex-col">
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
      </div>
    </div>
  );
};

export default Rashifal;
