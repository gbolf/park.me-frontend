type Parking = {
  id: number;
  title: string;
  images: string[];
  tags: ParkingCategories;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  price: number;
  description: string;
};
