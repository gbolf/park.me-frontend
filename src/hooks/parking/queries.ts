import { useQuery } from '@tanstack/react-query';
import img1 from '@images/car.jpg';
import img2 from '@images/man.jpg';
import img3 from '@images/woman.jpg';
import { PARKING_CATEGORIES } from '../../common/parkingCategories';

export const useParking = (parkingId: string) => {
  return useQuery({
    queryKey: ['parking', parkingId],
    queryFn: (): Parking => ({
      id: 1,
      title: 'Zagreb centar 1',
      images: [img1, img2, img3] as string[],
      tags: PARKING_CATEGORIES,
      coordinates: {
        latitude: 46.80627942047016,
        longitude: 15.97953767932404,
      },
      price: 7,
      description:
        'Parkirno mjesto Zagreb centar 1 nalazi se u samom srcu Zagreba, idealno za sve koji žele biti nadomak gradskih atrakcija, poslovnih zona i restorana. Lokacija je otvorena i lako dostupna, a osigurana je video nadzorom za dodatnu sigurnost vašeg vozila. Uz to, parkirno mjesto je označeno kao eko-friendly, što znači da podržava održiv način parkiranja i brigu za okoliš.',
    }),
    enabled: !!parkingId,
  });
};

export const useMyParkings = () => {
  return useQuery({
    queryKey: ['parkings'],
    queryFn: (): Parking[] => [
      {
        title: 'Zagreb centar 1',
        id: 1,
        images: [img1, img2, img3] as string[],
        tags: PARKING_CATEGORIES,
        coordinates: {
          latitude: 46.80627942047016,
          longitude: 15.97953767932404,
        },
        price: 7,
        description:
          'Parkirno mjesto Zagreb centar 1 nalazi se u samom srcu Zagreba, idealno za sve koji žele biti nadomak gradskih atrakcija, poslovnih zona i restorana. Lokacija je otvorena i lako dostupna, a osigurana je video nadzorom za dodatnu sigurnost vašeg vozila. Uz to, parkirno mjesto je označeno kao eko-friendly, što znači da podržava održiv način parkiranja i brigu za okoliš.',
      },
      {
        title: 'Zagreb centar 1',
        images: [img1, img2, img3] as string[],
        tags: PARKING_CATEGORIES,
        id: 1,
        coordinates: {
          latitude: 46.80627942047016,
          longitude: 15.97953767932404,
        },
        price: 7,
        description:
          'Parkirno mjesto Zagreb centar 1 nalazi se u samom srcu Zagreba, idealno za sve koji žele biti nadomak gradskih atrakcija, poslovnih zona i restorana. Lokacija je otvorena i lako dostupna, a osigurana je video nadzorom za dodatnu sigurnost vašeg vozila. Uz to, parkirno mjesto je označeno kao eko-friendly, što znači da podržava održiv način parkiranja i brigu za okoliš.',
      },
      {
        title: 'Zagreb centar 1',
        images: [img1, img2, img3] as string[],
        tags: PARKING_CATEGORIES,
        id: 1,
        coordinates: {
          latitude: 46.80627942047016,
          longitude: 15.97953767932404,
        },
        price: 7,
        description:
          'Parkirno mjesto Zagreb centar 1 nalazi se u samom srcu Zagreba, idealno za sve koji žele biti nadomak gradskih atrakcija, poslovnih zona i restorana. Lokacija je otvorena i lako dostupna, a osigurana je video nadzorom za dodatnu sigurnost vašeg vozila. Uz to, parkirno mjesto je označeno kao eko-friendly, što znači da podržava održiv način parkiranja i brigu za okoliš.',
      },
    ],
    initialData: [],
  });
};
