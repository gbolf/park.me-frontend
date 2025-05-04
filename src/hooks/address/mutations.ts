import { MAPBOX_API_KEY } from '@common/constants';
import { getResource } from '@common/crud';
import { useMutation } from '@tanstack/react-query';

export const useMapboxSearchByCoordinates = () => {
  return useMutation({
    mutationKey: ['mapboxAddressByCoordinates'],
    mutationFn: async ({ longitude, latitude }: { longitude: number; latitude: number }): Promise<MapboxAddress[]> => {
      const { features } = await await getResource<{ features: MapboxFeature[] }>(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&language=hr&types=address&country=HR&access_token=${MAPBOX_API_KEY}`
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
  });
};
