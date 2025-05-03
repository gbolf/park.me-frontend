type Parking = {
  id: string;
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

type ParkingFilters = {
  startDate: Dayjs;
  endDate: Dayjs;
  address: MapboxAddress;
  disatance: {
    value: number;
    unit: Mesumentunits[number];
  };
};
