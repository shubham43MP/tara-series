import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';

const Dropdown = ({
  options,
  handleSelect,
  label,
  value
}: {
  options: { label: string; value: number }[];
  handleSelect: (value: number) => void;
  label: string;
  value: number;
}) => {
  const t = useTranslations('rashi');
  const onOptionChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    handleSelect(value);
  };
  if (options.length < 1) {
    return 'No data.';
  }
  return (
    <>
      <label
        htmlFor="zodiac-select"
        className="block text-center text-lg font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        id="zodiac-select"
        className="block w-full max-w-56 bg-transparent border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={onOptionChangeHandler}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
