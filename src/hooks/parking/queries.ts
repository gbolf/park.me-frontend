import { useQuery } from '@tanstack/react-query';
import { getResource } from '@common/crud';
import { api } from '@common/api';
import { PARKING_CATEGORIES } from '@common/parkingCategories';

export const useParking = (parkingId: string) => {
  return useQuery({
    queryKey: ['parking', parkingId],
    queryFn: async (): Promise<Parking> => {
      const { parking, success } = await getResource<{
        success: boolean;
        parking: Omit<Parking, 'tags'> & { tags: string[]; _id: string; address: Parking['coordinates'] };
      }>(`${api.parking}/${parkingId}`)();
      if (!success) return null;
      return { ...parking, ...parking.address, id: parking._id, tags: parking.tags.map((id) => PARKING_CATEGORIES.find((t) => t.id === id)) };
    },
    enabled: !!parkingId,
  });
};

export const useMyParkings = () => {
  return useQuery({
    queryKey: ['myParkings'],
    queryFn: async (): Promise<Parking[]> => {
      const { parkings } = await getResource<{ parkings: (Omit<Parking, 'tags'> & { tags: string[]; _id: string })[] }>(api.myparkings)();
      return parkings.map((e) => ({ ...e, id: e._id, tags: e.tags.map((id) => PARKING_CATEGORIES.find((t) => t.id === id)) }));
    },
    initialData: [],
  });
};

export const useBookedParkings = () => {
  return useQuery({
    queryKey: ['bookoParkings'],
    queryFn: async (): Promise<Parking[]> => {
      const { parkings } = await getResource<{ parkings: (Omit<Parking, 'tags'> & { tags: string[]; _id: string })[] }>(api.bookedParkings)();
      return parkings.map((e) => ({ ...e, id: e._id, tags: e.tags.map((id) => PARKING_CATEGORIES.find((t) => t.id === id)) }));
    },
    initialData: [],
  });
};

export const useParkings = (filters: ParkingFilters) => {
  return useQuery({
    queryKey: ['parkings', filters],
    queryFn: async (): Promise<Parking[]> => {
      const { parkings } = await getResource<{ parkings: (Omit<Parking, 'tags'> & { tags: string[]; _id: string; address: Parking['coordinates'] })[] }>(
        `${api.parking}/${filters.address.coordinates[0]}/${filters.address.coordinates[1]}`
      )();
      return parkings.map((e) => ({ ...e, ...e.address, id: e._id, tags: e.tags.map((id) => PARKING_CATEGORIES.find((t) => t.id === id)) }));
    },
    enabled: filters.address.coordinates[0] > 0 && filters.address.coordinates[1] > 0,
    initialData: [],
  });
};
