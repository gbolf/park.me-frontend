import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Chip, CircularProgress, Collapse, Fade, Grid, Slide, Tooltip, Typography } from '@mui/material';
import { formatNumber } from '../../../common/utils';
import { Gallery } from './components/Galery';
import { StyledSideContainer } from '../../../layouts/style';
import { useMapContext } from '../../../layouts/MainLayout';
import { useParams } from 'react-router';
import { useParking } from '../../../hooks/parking/queries';
import { ParkingBookDetails } from '../ParkingBookView';
import { Lightbox, LightboxRef } from '@components/Lightbox';

export function ParkingDetailsView() {
  const [status, setStatus] = useState<'OVERVIEW' | 'RENT' | 'BOOKING'>('OVERVIEW');
  const { parkingId } = useParams();
  const parkingQuery = useParking(parkingId);
  const parking = parkingQuery.data;

  const mapContext = useMapContext();

  const onSubmit = () => {
    setStatus('RENT');
    setTimeout(() => setStatus('BOOKING'), 400);
  };

  useEffect(() => {
    if (parking?.cooridnate) {
      mapContext.setMapPostion((old) => ({ ...old, ...parking.cooridnate }));
      mapContext.setMarkerPositions((old) => [...old, { ...parking.cooridnate }]);
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
              <Grid container spacing="15px" mb="30px">
                <Grid size={12}>
                  <Gallery images={parking.images} />
                </Grid>
                <Grid size={12} sx={{ mb: '-15px' }}>
                  <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {parking.tags.map(({ color, label, description, id }, idx) => (
                      <Tooltip title={description} followCursor key={`${idx}-${id}`}>
                        <Chip size="small" label={label} sx={{ backgroundColor: color }} />
                      </Tooltip>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Fade>
          </Collapse>
        </Box>
        <Grid container spacing="15px">
          <Grid size={{ xs: 12, sm: 'auto' }} display="flex" justifyContent="space-between">
            <Fade in>
              <Typography variant="h3">{parking.title}</Typography>
            </Fade>
          </Grid>
          <Grid size={{ xs: 12, sm: 'auto' }} ml="auto" sx={{ mt: { xs: '-20px', sm: 0 } }}>
            <Fade in={status === 'OVERVIEW'}>
              <Typography variant="h4" color="primary">
                {formatNumber(parking.price)} € / hr
              </Typography>
            </Fade>
          </Grid>
        </Grid>
        <Fade in={status === 'OVERVIEW'} unmountOnExit>
          <Box mt="30px">
            <Typography>{parking.description}</Typography>
            <Typography>{parking.description}</Typography>
            <Typography>{parking.description}</Typography>
          </Box>
        </Fade>
      </StyledSideContainer>
      <Slide direction="up" in={status === 'OVERVIEW'}>
        <StyledSideContainer sx={{ height: 'max-content' }} key="actions">
          <Button size="small" variant="contained" onClick={onSubmit}>
            Odaberi
          </Button>
        </StyledSideContainer>
      </Slide>
    </>
  );
}
