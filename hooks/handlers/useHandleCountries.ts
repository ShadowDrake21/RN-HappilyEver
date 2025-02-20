import useFetchCountries from '../fetching/useFetchCountries';

const useHandleCountries = () => {
  const { data: allCountries, isLoading } = useFetchCountries({
    url: 'https://restcountries.com/v3.1/all',
    config: { params: { fields: 'name,flags,idd,cca2' } },
    queryKey: ['allCountries'],
  });

  return { allCountries, isLoading };
};

export default useHandleCountries;
