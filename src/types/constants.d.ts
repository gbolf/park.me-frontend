import { PARKING_CATEGORIES } from '@common/parkingCategories';

declare global {
  type ParkingCategories = typeof PARKING_CATEGORIES;
}
