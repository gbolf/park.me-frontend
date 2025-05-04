import React, { createContext, useContext, useState, ReactNode, useRef, useEffect, useMemo } from 'react';
import Map, { MapRef, Marker, MarkerDragEvent, ViewState } from 'react-map-gl/mapbox';
import { MAPBOX_API_KEY, MAPBOX_STYLE } from '@common/constants';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { RiArrowDownSFill } from '@remixicon/react';

const ZAGREB_LNG_LAT: Partial<ViewState> = { latitude: 45.80627942047016, longitude: 15.97953767932404, zoom: 16.8, pitch: 65 };

const MapContext = createContext<{
  setMapPostion: React.Dispatch<React.SetStateAction<Partial<ViewState>>>;
  setMarkerPositions: React.Dispatch<React.SetStateAction<MarkerProps[]>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}>(null);

export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [mapPostion, setMapPostion] = useState<Partial<ViewState>>(null);
  const [isActive, setIsActive] = useState(false);
  const [markerPositions, setMarkerPositions] = useState<MarkerProps[]>([]);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (mapPostion?.longitude && mapPostion?.latitude) {
      setTimeout(() => {
        mapRef.current?.flyTo({
          ...(!!mapPostion?.zoom && { zoom: mapPostion.zoom }),
          center: [mapPostion.longitude, mapPostion.latitude],
          duration: 1000,
        });
      }, 100);
    }
  }, [mapPostion]);

  return (
    <MapContext value={{ setMapPostion, setMarkerPositions, setIsActive }}>
      <Map
        key={`map-${isActive}`}
        ref={mapRef}
        initialViewState={mapPostion ?? ZAGREB_LNG_LAT}
        mapboxAccessToken={MAPBOX_API_KEY}
        style={{ ...(!isActive && { display: 'none' }), width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
        mapStyle={MAPBOX_STYLE}
      >
        {markerPositions.map((marker) => (
          <Marker
            key={`marker-${marker.latitude}-${marker.longitude}`}
            latitude={marker.latitude}
            longitude={marker.longitude}
            {...(typeof marker?.onDragEnd === 'function' && {
              draggable: true,
              onDragEnd: marker.onDragEnd,
            })}
          >
            <LocationCard {...marker} />
          </Marker>
        ))}
      </Map>
      {children}
    </MapContext>
  );
};

function LocationCard({ title = null, image = null, onClick = null }: MarkerProps) {
  if (!title || !image || typeof onClick !== 'function') {
    return <div style={{ color: 'red', fontSize: '24px' }}>📍</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <Card sx={{ width: 200, position: 'absolute', top: 0, transform: 'translateY(-100%)' }}>
        <CardActionArea onClick={onClick}>
          <CardMedia component="img" height="100" image={image} />
          <CardContent sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
            <Typography variant="caption" noWrap title={title}>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <RiArrowDownSFill />
    </Box>
  );
}
