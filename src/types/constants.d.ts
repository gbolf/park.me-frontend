import { MEASUREMENT_UNITS } from '@common/constants';
import { PARKING_CATEGORIES } from '@common/parkingCategories';

declare global {
  type ParkingCategories = typeof PARKING_CATEGORIES;
  type Mesumentunits = typeof MEASUREMENT_UNITS;
}
