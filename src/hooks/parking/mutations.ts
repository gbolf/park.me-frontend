import { useMutation } from '@tanstack/react-query';

export const bookParking = (parkingId: string) => {
  return useMutation({
    mutationKey: ['book', parkingId],
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return true;
    },
  });
};

export const createParking = () => {
  return useMutation({
    mutationKey: ['createNewParking'],
    mutationFn: async (props: { 
      categories: ParkingCategories; name: string; description: string; price: number }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return true;
    },
  });
};
