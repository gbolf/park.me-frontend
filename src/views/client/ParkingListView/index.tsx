import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { StyledLeftContainer } from './style';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FILTERS } from './components/filters';
import { useParkings } from '@hooks/parking/queries';
import { useMapContext } from '@contexts/map';
import { getMapViewState } from '@common/utils';
import { useNavigate } from 'react-router';
import { buildLink } from '@components/Router';
import { useMapboxSearchByCoordinates } from '@hooks/address/mutations';

const INITIAL_FILTERS: ParkingFilters = {
  startDate: dayjs(),
  endDate: null,
  address: { fullAddress: '', street: '', houseNumber: '', place: '', postCode: '', country: '', coordinates: [0, 0] },
  disatance: {
    value: 1,
    unit: 'km',
  },
};

export function Parkinglist() {
  const [openFilter, setOpenFilter] = useState(2 as number);
  const [filters, setFilters] = useState<ParkingFilters>(INITIAL_FILTERS);
  const { setMarkerPositions, setMapPostion } = useMapContext();
  const navigate = useNavigate();
  const parkingsQuery = useParkings(filters);
  const mapboxSearchByCoordinatesMutation = useMapboxSearchByCoordinates();

  useEffect(() => {
    const coordinates: MarkerProps[] = parkingsQuery.data.map(({ coordinates, title, images, id }) => ({
      ...coordinates,
      title,
      image: images[0],
      onClick: () => navigate(buildLink('parkingOverview', { parkingId: id })),
    }));
    setMarkerPositions(coordinates);
    setMapPostion(getMapViewState(coordinates));
  }, [parkingsQuery.data]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const [address] = await mapboxSearchByCoordinatesMutation.mutateAsync({ latitude, longitude });
        setFilters((old) => ({ ...old, address }));
      });
    } else {
      alert('Geolocation not supported');
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledLeftContainer>
        <Typography variant="subtitle1">Filteri</Typography>
        <Grid container spacing={1} mt={2}>
          {FILTERS.map((Filter, idx) => (
            <Grid size={12} key={idx}>
              <Filter
                filters={filters}
                setFilters={setFilters}
                expanded={idx === openFilter}
                onChange={() => setOpenFilter((old) => (old === idx ? null : idx))}
              />
            </Grid>
          ))}
        </Grid>
      </StyledLeftContainer>
    </LocalizationProvider>
  );
}
