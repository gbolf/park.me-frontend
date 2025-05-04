import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Chip, CircularProgress, Collapse, Divider, Fade, Grid, Slide, Tooltip, Typography } from '@mui/material';
import { formatNumber } from '@common/utils';
import { Gallery } from './components/Galery';
import { StyledSideContainer } from '../../../layouts/style';
import { useMapContext } from '@contexts/map';
import { useNavigate, useParams } from 'react-router';
import { useParking } from '@hooks/parking/queries';
import { ParkingBookDetails } from '../ParkingBookView';
import { buildLink } from '@components/Router';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';

export function ParkingDetailsView() {
  const [status, setStatus] = useState<'OVERVIEW' | 'RENT' | 'BOOKING'>('OVERVIEW');
  const { parkingId } = useParams();
  const navigate = useNavigate();
  const parkingQuery = useParking(parkingId);
  const parking = parkingQuery.data;
  const booking = { startDate: dayjs().set('minute', 0), endDate: dayjs().add(1, 'hour').set('minute', 0) };

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
  }, [parking]);

  if (parkingQuery.isLoading) {
    return <CircularProgress />;
  } else {
    if (!parking) {
      navigate(buildLink('dashboard'));
    }
  }

  if (status === 'BOOKING') {
    return <ParkingBookDetails />;
  }

  const differenceDays = booking.endDate.diff(booking.startDate, 'days');
  const differenceHours = booking.endDate.diff(booking.startDate, 'hours');
  const price = new Decimal(differenceHours).times(parking.price).toNumber();
  const discount = differenceHours >= 24 ? new Decimal(price).times(0.1).toNumber() : 0;
  const totalPrice = new Decimal(price).minus(discount).toNumber();

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
          {!booking?.startDate && (
            <Grid size={12} container spacing={1} sx={{ border: '2px solid #3F523B', padding: 1, borderRadius: 3, backgroundColor: '#FFFFFF' }}>
              <Grid container size={12}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1">Početak najma</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography>{booking.startDate.format('D.MM.YYYY HH:mm')}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1">Kraj najma</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography>{booking.endDate.format('D.MM.YYYY HH:mm')}</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container size={12} mt={2}>
                <Grid size={12}>
                  <Typography variant="subtitle1">Cijana</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}></Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  {differenceDays ? <Typography>Broj data: {differenceDays}</Typography> : <Typography>Broj sati: {differenceHours}</Typography>}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}></Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography>Cijena po satu: {formatNumber(parking.price)} €</Typography>
                </Grid>
                {!!discount && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}></Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography>Ukupno (bez popusta): {formatNumber(price)} €</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}></Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography>
                        Popust (10% za dnevni najam): <span>-{formatNumber(discount)} €</span>
                      </Typography>
                    </Grid>
                  </>
                )}
                <Divider />
                <Grid size={{ xs: 12, md: 6 }}></Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1">Ukupno: {formatNumber(totalPrice)} €</Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid size={12} mt={2}>
            <Fade in={status === 'OVERVIEW'} unmountOnExit>
              <Typography>{parking.description}</Typography>
            </Fade>
          </Grid>
        </Grid>
      </StyledSideContainer>
      {booking?.startDate && (
        <Slide direction="up" in={status === 'OVERVIEW'} timeout={{ exit: 300 }}>
          <StyledSideContainer sx={{ height: 90 }} key="actions">
            <Button size="small" variant="contained" onClick={onSubmit}>
              Odaberi
            </Button>
          </StyledSideContainer>
        </Slide>
      )}
    </>
  );
}
