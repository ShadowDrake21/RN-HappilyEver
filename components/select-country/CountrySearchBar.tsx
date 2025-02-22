import { Searchbar } from 'react-native-paper';

import { COLORS } from '~/constants/colors';

type CountrySearchBarProps = {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  debouncedSearch: (text: string) => void;
};

const CountrySearchBar = ({
  searchQuery,
  setSearchQuery,
  debouncedSearch,
}: CountrySearchBarProps) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={(text) => {
        setSearchQuery(text);
        debouncedSearch(text);
      }}
      value={searchQuery}
      style={{ backgroundColor: COLORS.extraDark, borderRadius: 10 }}
      placeholderTextColor={COLORS.grayish}
      iconColor={COLORS.grayish}
      inputStyle={{ color: COLORS.text }}
    />
  );
};

export default CountrySearchBar;
