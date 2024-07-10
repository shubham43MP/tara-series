import { useTranslations } from 'next-intl';
import * as React from 'react';

interface IData {
  id: number;
  planets: string[];
}

interface IRashiFalData {
  chartData: {
    [key: number]: IData;
  };
}

const getPositionStyles = (houseNumber: number) => {
  switch (houseNumber) {
    case 1:
      return 'top-[165px] left-[263px]';
    case 2:
      return 'top-[90px] left-[148px]';
    case 3:
      return 'top-[165px] left-[76px]';
    case 4:
      return 'top-[270px] left-[148px]';
    case 5:
      return 'top-[388px] left-[76px]';
    case 6:
      return 'top-[462px] left-[148px]';
    case 7:
      return 'top-[388px] left-[263px]';
    case 8:
      return 'top-[462px] left-[375px]';
    case 9:
      return 'top-[388px] left-[442px]';
    case 10:
      return 'top-[270px] left-[375px]';
    case 11:
      return 'top-[165px] left-[442px]';
    case 12:
      return 'top-[90px] left-[375px]';
    default:
      return '';
  }
};

const RashifalChart: React.FC<IRashiFalData> = ({ chartData }) => {
  const t = useTranslations('planetList');

  const isValidData = () => {
    const keys = Object.keys(chartData).map(Number);
    const allKeysPresent = Array.from({ length: 12 }, (_, i) => i + 1).every(
      key => keys.includes(key)
    );
    const validIdsAndPlanets = Object.values(chartData).every(
      house =>
        typeof house.id === 'number' &&
        Array.isArray(house.planets) &&
        house.planets.every(planet => typeof planet === 'string')
    );
    return allKeysPresent && validIdsAndPlanets;
  };

  if (!chartData || Object.keys(chartData).length !== 12 || !isValidData()) {
    return 'Data is wrong';
  }

  let containerClass = 'flex flex-wrap gap-1.5 items-center justify-center';

  return (
    <div className="relative">
      {Object.keys(chartData).map(key => {
        const houseNumber = parseInt(key, 10);
        const positionStyles = getPositionStyles(houseNumber);
        const uniquePlanets = Array.from(
          new Set(chartData[houseNumber].planets)
        );

        return (
          <div
            key={houseNumber}
            id={`planetForHouse${houseNumber}`}
            className={`absolute ${positionStyles} w-[80px] h-16 ${containerClass}`}
          >
            {uniquePlanets.map((planet: string, index: number) => (
              <p className="text-sm" key={index}>
                {t(planet)}
              </p>
            ))}
          </div>
        );
      })}

      <svg height="600" width="600" viewBox="0 0 800 780" rx="15" ry="15">
        {/* <!-- House 1 --> */}
        <polygon
          points="400 100,250 250,400 400,550 250"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house1"
        />
        <text
          x="385"
          y="380"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[1].id}
        </text>

        {/* <!-- House 2 --> */}
        <polygon
          points="100 100, 250 250,400 100"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house2"
        />
        <text
          x="240"
          y="225"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[2].id}
        </text>

        {/* <!-- House 3 --> */}
        <polygon
          points="100 400,250 250,100 100"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house3"
        />
        <text
          x="210"
          y="257"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[3].id}
        </text>

        {/* <!-- House 4 --> */}
        <polygon
          points="250 250,100 400,250 550,400 400"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house4"
        />
        <text
          x="360"
          y="407"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[4].id}
        </text>

        {/* <!-- House 5 --> */}
        <polygon
          points="100 400,250 550,100 700"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house5"
        />
        <text
          x="210"
          y="555"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[5].id}
        </text>

        {/* <!-- House 6 --> */}
        <polygon
          points="100 700,250 550,400 700"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house6"
        />
        <text
          x="240"
          y="585"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[6].id}
        </text>

        {/* <!-- House 7 --> */}
        <polygon
          points="400 400,250 550,400 700,550 550"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house7"
        />
        <text
          x="385"
          y="430"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[7].id}
        </text>

        {/* <!-- House 8 --> */}
        <polygon
          points="400 700,550 550,700 700"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house8"
        />
        <text
          x="538"
          y="580"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[8].id}
        </text>

        {/* <!-- House 9 --> */}
        <polygon
          points="700 400,550 550,700 700"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house9"
        />
        <text
          x="565"
          y="555"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[9].id}
        </text>

        {/* <!-- House 10 --> */}
        <polygon
          points="550 250,700 400,550 550,400 400"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house10"
        />
        <text
          x="410"
          y="406"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[10].id}
        </text>

        {/* <!-- House 11 --> */}
        <polygon
          points="700 100,550 250,700 400"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house11"
        />
        <text
          x="560"
          y="255"
          fontFamily="Verdana"
          fontSize="20"
          fontWeight={600}
          fill="black"
        >
          {chartData[11].id}
        </text>

        {/* <!-- House 12 --> */}
        <polygon
          points="400 100,550 250,700 100"
          style={{ fill: 'none', stroke: '#000', strokeWidth: 1 }}
          id="house12"
        />
        <text
          x="538"
          y="235"
          fontFamily="Verdana"
          fontWeight={600}
          fontSize="20"
          fill="black"
        >
          {chartData[12].id}
        </text>
      </svg>
    </div>
  );
};

export default RashifalChart;
