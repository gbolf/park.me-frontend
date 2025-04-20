import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, Slide, Typography, Box, TextField, CircularProgress, Fade } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { StyledSideContainer } from '../../../layouts/style';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { INITIAL_VALUES } from './validation';
import Decimal from 'decimal.js';
import { formatNumber } from '../../../common/utils';
import { useParking } from '../../../hooks/parking/queries';
import { useParams } from 'react-router';
import { bookParking } from '../../../hooks/parking/mutations';

export function ParkingBookDetails() {
  const { parkingId } = useParams();
  const parkingQuery = useParking(parkingId);
  const parking = parkingQuery.data;
  const bookParkingMutation = bookParking(parkingId);

  // 0 - Unos datuma
  // 1 - Plaćanje
  // 2 - Obrada Plaćanja
  // 3 - Plaćanje je uspjelo
  // 4 - Plaćanje nije uspjelo
  const [step, setStep] = useState(0);
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: { ...INITIAL_VALUES },
    onSubmit: () => {
      bookParkingMutation.mutate(null, { onSettled: () => setStep(3) });
    },
  });

  const handleNext = () => {
    setStep((old) => {
      if (old === 1) {
        handleSubmit();
      }
      return old + 1;
    });
  };

  if (parkingQuery.isFetching) {
    return;
  }

  const differenceDays = values.endDate.diff(values.startDate, 'days');
  const differenceHours = values.endDate.diff(values.startDate, 'hours');
  const price = new Decimal(differenceHours).times(parking.price).toNumber();
  const discount = differenceHours > 24 ? new Decimal(price).times(0.1).toNumber() : 0;
  const totalPrice = new Decimal(price).minus(discount).toNumber();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledSideContainer key="main-container">
        <Typography variant="h3" sx={{ alignSelf: 'flex-start', pb: '30px', overflow: 'hidden', ...(step >= 3 && { height: 0, p: 0 }) }}>
          {parking.title}
        </Typography>
        <Fade in={step === 0} unmountOnExit>
          <Box>
            <Grid container spacing="15px">
              <Grid size={12}>
                <Typography>Početak</Typography>
              </Grid>
              <Grid size={6}>
                <DatePicker
                  value={values.startDate}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  onChange={(value) => {
                    setFieldValue('startDate', value);
                    if (value.isAfter(values.endDate)) {
                      setFieldValue('endDate', value);
                    }
                  }}
                  disablePast
                />
              </Grid>
              <Grid size={6}>
                <TimePicker
                  value={values.startDate}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  onChange={(time) => {
                    const updated = dayjs(values.startDate).hour(time.hour()).minute(time.minute());
                    setFieldValue('startDate', updated);
                    if (updated.isAfter(values.endDate)) {
                      setFieldValue('endDate', updated);
                    }
                  }}
                />
              </Grid>
              <Grid size={12}>
                <Typography>Kraj</Typography>
              </Grid>
              <Grid size={6}>
                <DatePicker
                  value={values.endDate}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  onChange={(value) => setFieldValue('endDate', value)}
                  shouldDisableDate={(date) => date.isBefore(values.startDate, 'day')}
                />
              </Grid>
              <Grid size={6}>
                <TimePicker
                  value={values.endDate}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  onChange={(time) => {
                    const updated = dayjs(values.endDate).hour(time.hour()).minute(time.minute());
                    setFieldValue('endDate', updated);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing="7px" mt="30px">
              <Grid size={12} sx={{ pb: '8px' }}>
                <Typography variant="h4">Cijana</Typography>
              </Grid>
              <Grid size={12}>
                {differenceDays ? <Typography>Broj data: {differenceDays}</Typography> : <Typography>Broj sati: {differenceHours}</Typography>}
              </Grid>
              <Grid size={12}>
                <Typography>Cijena po satu: {formatNumber(parking.price)} €</Typography>
              </Grid>
              {!!discount && (
                <>
                  <Grid size={12}>
                    <Typography>Ukupno (bez popusta): {formatNumber(price)} €</Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography>Popust (10% za dnevni najam) -{formatNumber(discount)} €</Typography>
                  </Grid>
                </>
              )}
              <Divider />
              <Grid size={12}>
                <Typography>Ukupno: {formatNumber(totalPrice)} €</Typography>
              </Grid>
            </Grid>
          </Box>
        </Fade>
        <Fade in={step === 1} unmountOnExit style={{ transitionDelay: '300ms' }}>
          <Grid container spacing="15px">
            <Grid size={12}>
              <TextField label="Broj kartice" fullWidth />
            </Grid>
            <Grid size={12}>
              <TextField label="Ime i prezime vlasnika" fullWidth />
            </Grid>
            <Grid size={6}>
              <TextField label="Datum isteka" fullWidth placeholder="MM/GG" />
            </Grid>
            <Grid size={6}>
              <TextField label="CVV" fullWidth />
            </Grid>
          </Grid>
        </Fade>
        <Fade in={step === 2} unmountOnExit style={{ transitionDelay: '0' }}>
          <CircularProgress sx={{ margin: 'auto' }} size="20%" />
        </Fade>
        <Fade in={step === 3} unmountOnExit style={{ transitionDelay: '300ms' }}>
          <Box sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="h4">
              Rezervacija <span> #123</span>
            </Typography>
            <Typography variant="h3" fontWeight="800">
              Rezervacija uspješna!
            </Typography>
          </Box>
        </Fade>
      </StyledSideContainer>
      <Slide direction="up" in={step < 2} unmountOnExit>
        <StyledSideContainer sx={{ height: 'max-content' }} key="actions">
          <Button size="small" variant="contained" onClick={handleNext}>
            {step === 0 ? 'Na plaćanje' : 'Plati'}
          </Button>
        </StyledSideContainer>
      </Slide>
    </LocalizationProvider>
  );
}
