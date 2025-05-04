import { useQuery } from '@tanstack/react-query';
import { getResource } from '@common/crud';
import { MAPBOX_API_KEY } from '@common/constants';
import { useDebounce } from '@hooks/useDebounce';

export const useMapboxSearch = (q: string) => {
  const debouncedQuery = useDebounce(q, 500);

  return useQuery({
    queryKey: ['mapboxAddress', debouncedQuery],
    queryFn: async (): Promise<MapboxAddress[]> => {
      const { features } = await getResource<{ features: MapboxFeature[] }>(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
          debouncedQuery
        )}&language=hr&country=HR&types=address&access_token=${MAPBOX_API_KEY}`
      )();

      return features?.map(
        ({
          geometry,
          properties: {
            full_address,
            context: { place, postcode, address, country },
          },
        }) => ({
          fullAddress: full_address,
          street: address.street_name,
          houseNumber: address.address_number,
          place: place.name,
          postCode: postcode.name,
          country: country.name,
          coordinates: geometry.coordinates,
        })
      );
    },
    initialData: [],
    enabled: !!(debouncedQuery?.length > 5),
  });
};
