import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { StyledContainer } from './style';
import Map, { Marker, MarkerDragEvent, ViewState } from 'react-map-gl/mapbox';
import { MAPBOX_API_KEY, MAPBOX_STYLE } from '../common/constants';

type MarkerProps = { longitude: number; latitude: number; onDragEnd?: (e: MarkerDragEvent) => void };

const ZAGREB_LNG_LAT: Partial<ViewState> = { latitude: 45.80627942047016, longitude: 15.97953767932404, zoom: 16.8, pitch: 65 };

const MapContext = createContext<{
  setMapPostion: React.Dispatch<React.SetStateAction<Partial<ViewState>>>;
  setMarkerPositions: React.Dispatch<React.SetStateAction<MarkerProps[]>>;
}>(null);
export const useMapContext = () => useContext(MapContext);

export function MainLayout({ children }: { children: ReactNode }) {
  const mapRef = useRef(null);

  const [mapPostion, setMapPostion] = useState<Partial<ViewState>>(null);
  const [markerPositions, setMarkerPositions] = useState<MarkerProps[]>([]);

  useEffect(() => {
    if (mapPostion?.longitude && mapPostion?.latitude) {
      mapRef.current?.flyTo({ center: [mapPostion.longitude, mapPostion.latitude], duration: 1000 });
    }
  }, [mapPostion]);

  return (
    <MapContext value={{ setMapPostion, setMarkerPositions }}>
      <StyledContainer>
        <Map
          ref={mapRef}
          key="map"
          initialViewState={ZAGREB_LNG_LAT}
          mapboxAccessToken={MAPBOX_API_KEY}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          mapStyle={MAPBOX_STYLE}
        >
          {markerPositions.map((cooridnate) => (
            <Marker
              {...cooridnate}
              {...(typeof cooridnate.onDragEnd === 'function' && {
                draggable: true,
                onDragEnd: cooridnate.onDragEnd,
              })}
            >
              <div style={{ color: 'red', fontSize: '24px' }}>📍</div>
            </Marker>
          ))}
        </Map>
        {children}
      </StyledContainer>
    </MapContext>
  );
}
