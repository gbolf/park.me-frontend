import React from 'react';

import { Box, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormikProps } from 'formik';
import Decimal from 'decimal.js';
import { createGetProps, formatNumber } from '@common/utils';
import { INITIAL_VALUES } from '../validation';
import { CardNumberPattern, CCVPattern, MonthYearPattern } from '@common/patterns';

function SlotPickerTab({
  formik,
  parking,
  getProps,
}: {
  formik: FormikProps<typeof INITIAL_VALUES>;
  parking: Parking;
  getProps: ReturnType<typeof createGetProps>;
}) {
  const { values, setFieldValue } = formik;

  const differenceDays = values.endDate.diff(values.startDate, 'days');
  const differenceHours = values.endDate.diff(values.startDate, 'hours');
  const price = new Decimal(differenceHours).times(parking.price).toNumber();
  const discount = differenceHours >= 24 ? new Decimal(price).times(0.1).toNumber() : 0;
  const totalPrice = new Decimal(price).minus(discount).toNumber();

  const startDateProps = getProps('startDate');
  const endDateProps = getProps('endDate');

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="subtitle1">Odabit termina</Typography>
      </Grid>
      <Grid size={12}>
        <Typography>Početak</Typography>
      </Grid>
      <Grid size={6}>
        <DatePicker
          value={values.startDate}
          slotProps={{ textField: { size: 'small', fullWidth: true, error: startDateProps.error, label: 'Datum početka' } }}
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
          ampm={false}
          views={['hours']}
          value={values.startDate}
          slotProps={{ textField: { size: 'small', fullWidth: true, error: startDateProps.error, label: 'Vrijeme početka' } }}
          onChange={(time) => {
            const updated = dayjs(values.startDate).hour(time.hour()).minute(time.minute());
            setFieldValue('startDate', updated);
            if (updated.isAfter(values.endDate)) {
              setFieldValue('endDate', updated.add(1, 'hour'));
            }
          }}
        />
      </Grid>
      {startDateProps.error && (
        <Grid size={12}>
          <Typography variant="caption" color="error">
            {startDateProps.helperText}
          </Typography>
        </Grid>
      )}
      <Grid size={12}>
        <Typography>Završetak</Typography>
      </Grid>
      <Grid size={6}>
        <DatePicker
          value={values.endDate}
          slotProps={{ textField: { size: 'small', fullWidth: true, error: endDateProps.error, label: 'Datum završetka' } }}
          onChange={(value) => setFieldValue('endDate', value)}
          shouldDisableDate={(date) => date.isBefore(values.startDate, 'day')}
        />
      </Grid>
      <Grid size={6}>
        <TimePicker
          ampm={false}
          views={['hours']}
          value={values.endDate}
          slotProps={{ textField: { size: 'small', fullWidth: true, error: endDateProps.error, label: 'Vrijeme završetka' } }}
          onChange={(time) => {
            const updated = dayjs(values.endDate).hour(time.hour()).minute(time.minute());
            setFieldValue('endDate', updated);
            if (updated.isBefore(values.startDate)) {
              setFieldValue('startDate', updated.subtract(1, 'hour'));
            }
          }}
        />
      </Grid>
      {endDateProps.error && (
        <Grid size={12}>
          <Typography variant="caption" color="error">
            {endDateProps.helperText}
          </Typography>
        </Grid>
      )}
      <Grid container size={12} spacing={1} mt={2}>
        <Grid size={12}>
          <Typography variant="subtitle1">Cijana</Typography>
        </Grid>
        <Grid size={12}>{differenceDays ? <Typography>Broj data: {differenceDays}</Typography> : <Typography>Broj sati: {differenceHours}</Typography>}</Grid>
        <Grid size={12}>
          <Typography>Cijena po satu: {formatNumber(parking.price)} €</Typography>
        </Grid>
        {!!discount && (
          <>
            <Grid size={12}>
              <Typography>Ukupno (bez popusta): {formatNumber(price)} €</Typography>
            </Grid>
            <Grid size={12}>
              <Typography>
                Popust (10% za dnevni najam): <span>-{formatNumber(discount)} €</span>
              </Typography>
            </Grid>
          </>
        )}
        <Divider />
        <Grid size={12}>
          <Typography>Ukupno: {formatNumber(totalPrice)} €</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

function PaymentTab({ getProps }: { getProps: ReturnType<typeof createGetProps> }) {
  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="subtitle1">Podatci za naplatu</Typography>
      </Grid>
      <Grid size={12}>
        <TextField {...getProps('card.number', 'Broj kartice', '4111 1111 1111 1111')} slotProps={{ input: { inputComponent: CardNumberPattern } }} />
      </Grid>
      <Grid size={12}>
        <TextField {...getProps('card.name', 'Ime i prezime vlasnika', 'Ivan Horvat')} />
      </Grid>
      <Grid size={8}>
        <TextField {...getProps('card.expiry', 'Datum isteka', '05/30')} slotProps={{ input: { inputComponent: MonthYearPattern } }} />
      </Grid>
      <Grid size={4}>
        <TextField {...getProps('card.cvv', 'CVV', '1234')} slotProps={{ input: { inputComponent: CCVPattern } }} />
      </Grid>
    </Grid>
  );
}

function LoadingTab() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress sx={{ margin: 'auto' }} size="20%" />
    </Box>
  );
}

function SuccessTab({ bookingId }: { bookingId: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Typography variant="h4">
        Rezervacija <span> #{bookingId}</span>
      </Typography>
      <Typography variant="h3" fontWeight="800">
        Rezervacija uspješna!
      </Typography>
    </Box>
  );
}

export const TABS = [SlotPickerTab, PaymentTab, LoadingTab, SuccessTab] as const;
