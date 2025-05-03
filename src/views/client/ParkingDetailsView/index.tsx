import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Chip, CircularProgress, Collapse, Fade, Grid, Slide, Tooltip, Typography } from '@mui/material';
import { formatNumber } from '@common/utils';
import { Gallery } from './components/Galery';
import { StyledSideContainer } from '../../../layouts/style';
import { useMapContext } from '@contexts/map';
import { useParams } from 'react-router';
import { useParking } from '@hooks/parking/queries';
import { ParkingBookDetails } from '../ParkingBookView';

export function ParkingDetailsView() {
  const [status, setStatus] = useState<'OVERVIEW' | 'RENT' | 'BOOKING'>('OVERVIEW');
  const { parkingId } = useParams();
  const parkingQuery = useParking(parkingId);
  const parking = parkingQuery.data;

  const { setMarkerPositions, setMapPostion } = useMapContext();

  const onSubmit = () => {
    setStatus('RENT');
    setTimeout(() => setStatus('BOOKING'), 400);
  };

  useEffect(() => {
    if (parking?.coordinates) {
      setMarkerPositions([parking.coordinates]);
      setMapPostion(parking.coordinates);
    }
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(async (pos) => {
    //     const { latitude, longitude } = pos.coords;
    //     setViewport((prev) => ({ ...prev, latitude, longitude }));
    //   });
    // } else {
    //   alert('Geolocation not supported');
    // }
  }, [parking]);

  if (parkingQuery.isLoading) {
    return <CircularProgress />;
  }

  if (status === 'BOOKING') {
    return <ParkingBookDetails />;
  }

  return (
    <>
      <StyledSideContainer key="main-container">
        <Box>
          <Collapse in={status === 'OVERVIEW'} unmountOnExit>
            <Fade in>
              <Grid container spacing={1} mb={2}>
                <Grid size={12}>
                  <Gallery images={parking.images} sx={{ '& img': { p: 0, objectFit: 'cover' } }} />
                </Grid>
                <Grid container size={12} spacing={1}>
                  {parking.tags.map(({ color, label, description, id }, idx) => (
                    <Grid>
                      <Tooltip title={description} followCursor key={`${idx}-${id}`}>
                        <Chip size="small" label={label} sx={{ backgroundColor: color }} />
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Fade>
          </Collapse>
        </Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <Fade in>
              <Typography variant="h3">{parking.title}</Typography>
            </Fade>
          </Grid>
          <Grid size={{ xs: 12, sm: 'auto' }} ml="auto">
            <Fade in={status === 'OVERVIEW'}>
              <Typography variant="h4" color="primary">
                {formatNumber(parking.price)} € / hr
              </Typography>
            </Fade>
          </Grid>
          <Grid size={12} mt={2}>
            <Fade in={status === 'OVERVIEW'} unmountOnExit>
              <Typography>{parking.description}</Typography>
            </Fade>
          </Grid>
        </Grid>
      </StyledSideContainer>
      <Slide direction="up" in={status === 'OVERVIEW'} timeout={{ exit: 300 }}>
        <StyledSideContainer sx={{ height: 90 }} key="actions">
          <Button size="small" variant="contained" onClick={onSubmit}>
            Odaberi
          </Button>
        </StyledSideContainer>
      </Slide>
    </>
  );
}
