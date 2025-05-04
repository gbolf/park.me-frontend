import { useMutation } from '@tanstack/react-query';
import { INITIAL_VALUES } from '../../views/renter/RentPlace/validations';
import { INITIAL_VALUES as bookParkingInitial } from '../../views/client/ParkingBookView/validation';
import { postResource } from '@common/crud';
import { api } from '@common/api';
import { useFileUpload } from '@hooks/file/mutations';

export const bookParking = (parkingId: string) => {
  return useMutation({
    mutationKey: ['book', parkingId],
    mutationFn: async (values: typeof bookParkingInitial) => {
      await postResource(`${api.parking}/${parkingId}`, { startTime: values.startDate.toISOString(), endTime: values.endDate.toISOString() })();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return '123';
    },
  });
};

export const createParking = () => {
  const fileUploadMutation = useFileUpload();
  return useMutation({
    mutationKey: ['createNewParking'],
    mutationFn: async (values: typeof INITIAL_VALUES) => {
      const uploadedImages = await Promise.all(
        values.images.map(async (e) => {
          const result = await fileUploadMutation.mutateAsync(e.file);
          return result.url;
        })
      );

      await postResource(api.parking, {
        ...values,
        images: uploadedImages,
        tags: values.tags.map((e) => e.id),
        address: {
          ...values.address,
          coordinates: {
            longitude: values.address.coordinates[0],
            latitude: values.address.coordinates[1],
          },
        },
      })();
      return true;
    },
  });
};
