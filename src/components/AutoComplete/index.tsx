'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { AutoCompleteProps } from './autocomplete.interface';

const AutoCompleteSelect = ({
  options,
  handleSelect,
  searchPlaceholder
}: AutoCompleteProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const [filteredOptions, setFilteredOptions] =
    useState<{ value: number; label: string }[]>(options);
  const t = useTranslations('nakshatraList');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: { value: number; label: string }) => {
    handleSelect(option);
    setSearchTerm('');
    setFilteredOptions(options);
    setShowList(false);
  };

  const handleShowList = () => {
    setShowList(true);
  };

  const handleHideList = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTimeout(() => setShowList(false), 100);
  };

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleShowList}
        onBlur={handleHideList}
        placeholder={searchPlaceholder}
        className="outline-none border border-purple-500 bg-transparent w-96 p-2 rounded-xl placeholder:text-white text-white"
      />
      {showList && filteredOptions.length > 0 && (
        <ul className="absolute mt-1 bg-white border border-purple-500 rounded-lg shadow-lg w-full max-h-40 overflow-y-auto z-10">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              onMouseDown={() => handleOptionClick(option)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={`cursor-pointer p-2 ${
                highlightedIndex === index
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-black'
              } hover:bg-purple-500 hover:text-white transition-colors duration-200`}
            >
              {t(option.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteSelect;
