export interface AutoCompletOptions {
  value: number;
  label: string;
}

export interface AutoCompleteProps {
  options: AutoCompletOptions[];
  handleSelect: (selectedOption: AutoCompletOptions) => void;
  searchPlaceholder: string;
}
