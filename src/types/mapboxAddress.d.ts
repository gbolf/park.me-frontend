import { MarkerDragEvent } from 'react-map-gl/mapbox';

declare global {
  type RoutablePoint = {
    name: string;
    latitude: number;
    longitude: number;
  };

  type Coordinates = {
    longitude: number;
    latitude: number;
    accuracy: string;
    routable_points: RoutablePoint[];
  };

  type MatchCode = {
    address_number: string;
    street: string;
    postcode: string;
    place: string;
    region: string;
    locality: string;
    country: string;
    confidence: string;
  };

  type ContextAddress = {
    mapbox_id: string;
    address_number: string;
    street_name: string;
    name: string;
  };

  type ContextStreet = {
    mapbox_id: string;
    name: string;
  };

  type ContextPostcode = {
    mapbox_id: string;
    name: string;
  };

  type ContextPlace = {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
  };

  type ContextRegion = {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
    region_code: string;
    region_code_full: string;
  };

  type ContextCountry = {
    mapbox_id: string;
    name: string;
    wikidata_id: string;
    country_code: string;
    country_code_alpha_3: string;
  };

  type Context = {
    address: ContextAddress;
    street: ContextStreet;
    postcode: ContextPostcode;
    place: ContextPlace;
    region: ContextRegion;
    country: ContextCountry;
  };

  type MapboxProperties = {
    mapbox_id: string;
    feature_type: string;
    full_address: string;
    name: string;
    name_preferred: string;
    coordinates: Coordinates;
    place_formatted: string;
    match_code: MatchCode;
    context: Context;
  };

  type Geometry = {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };

  type MapboxFeature = {
    type: 'Feature';
    id: string;
    geometry: Geometry;
    properties: MapboxProperties;
  };

  type MapboxAddress = {
    fullAddress: string;
    street: string;
    houseNumber: string;
    place: string;
    postCode: string;
    country: string;
    coordinates: [number, number];
  };

  type MarkerProps = {
    longitude: number;
    latitude: number;
    onDragEnd?: (e: MarkerDragEvent) => void;
    image?: string;
    title?: string;
    onClick?: () => void;
  };
}
