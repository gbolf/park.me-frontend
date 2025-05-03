import { useMutation } from '@tanstack/react-query';
import { INITIAL_VALUES } from '../../views/renter/RentPlace/validations';

export const bookParking = (parkingId: string) => {
  return useMutation({
    mutationKey: ['book', parkingId],
    mutationFn: async (values: any) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return '123';
    },
  });
};

export const createParking = () => {
  return useMutation({
    mutationKey: ['createNewParking'],
    mutationFn: async (props: typeof INITIAL_VALUES) => {
      console.log(props);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return true;
    },
  });
};
