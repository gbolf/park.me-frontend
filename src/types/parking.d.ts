type Parking = {
  id: number;
  title: string;
  images: string[];
  tags: ParkingCategories;
  cooridnate: {
    latitude: number;
    longitude: number;
  };
  price: number;
  description: string;
};
