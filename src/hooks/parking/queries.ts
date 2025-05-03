import { useQuery } from '@tanstack/react-query';
import { PARKINGS } from './parkings';

export const useParking = (parkingId: string) => {
  return useQuery({
    queryKey: ['parking', parkingId],
    queryFn: (): Parking => PARKINGS.find((e) => e.id === parkingId),
    enabled: !!parkingId,
  });
};

export const useMyParkings = () => {
  return useQuery({
    queryKey: ['parkings'],
    queryFn: (): Parking[] => PARKINGS,
    initialData: [],
  });
};

export const useParkings = (filters: ParkingFilters) => {
  return useQuery({
    queryKey: ['parkings', filters],
    queryFn: (): Parking[] => PARKINGS,
    initialData: [],
  });
};
