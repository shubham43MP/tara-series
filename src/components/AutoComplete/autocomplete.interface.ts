export interface AutoCompleteProps {
  options: { value: number; label: string }[];
  handleSelect: (selectedOption: { value: number; label: string }) => void;
  searchPlaceholder: string;
}
