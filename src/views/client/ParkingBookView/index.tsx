import React, { useState } from 'react';
import { Button, Slide, Typography, Box, Fade, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { StyledSideContainer } from '../../../layouts/style';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { getFieldsForStep, INITIAL_VALUES, validationSchema } from './validation';
import { createGetProps, validateCurrentStep } from '../../../common/utils';
import { useParking } from '../../../hooks/parking/queries';
import { useParams } from 'react-router';
import { bookParking } from '../../../hooks/parking/mutations';
import { TABS } from './components/tabs';

export function ParkingBookDetails() {
  const [bookingId, setBookingId] = useState<string>(null);
  const { parkingId } = useParams();
  const parkingQuery = useParking(parkingId);
  const parking = parkingQuery.data;
  const bookParkingMutation = bookParking(parkingId);
  const theme = useTheme();

  const formik = useFormik({
    validationSchema,
    initialValues: { ...INITIAL_VALUES },
    onSubmit: async (values, { setSubmitting, setFieldValue }) => {
      setSubmitting(true);
      const _bookingId = await bookParkingMutation.mutateAsync(values, {
        onSettled: () => {
          setFieldValue('step', 3);
          setTimeout(() => setFieldValue('step', -1), theme.transitions.duration.enteringScreen * 10);
        },
      });
      if (_bookingId) {
        setBookingId(_bookingId);
      }
      setSubmitting(false);
    },
  });
  const getProps = createGetProps(formik);

  const handleNext = async () => {
    const isValid = await validateCurrentStep(formik, getFieldsForStep);
    if (!isValid) {
      return;
    }
    formik.setFieldValue('step', formik.values.step + 1);
    if (formik.values.step === TABS.length - 3) {
      formik.handleSubmit();
    }
  };

  if (parkingQuery.isFetching) {
    return;
  }

  return (
    <>
      <StyledSideContainer key="main-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fade in={formik.values.step < 2 && formik.values.step >= 0} timeout={{ enter: 0, exit: theme.transitions.duration.enteringScreen }}>
            <Typography variant="h3" sx={{ alignSelf: 'flex-start', pb: '30px' }}>
              {parking.title}
            </Typography>
          </Fade>
          {TABS.map((Component, idx) => (
            <Fade
              in={formik.values.step === idx}
              unmountOnExit
              {...(formik.values.step === -1 && { timeout: { exit: theme.transitions.duration.enteringScreen } })}
            >
              <Box sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Component getProps={getProps} formik={formik} parking={parking} bookingId={bookingId} />
              </Box>
            </Fade>
          ))}
        </LocalizationProvider>
      </StyledSideContainer>
      <Slide direction="up" in={formik.values.step < 2 && formik.values.step >= 0} unmountOnExit>
        <StyledSideContainer sx={{ height: 90 }} key="actions">
          <Button size="small" variant="contained" onClick={handleNext}>
            {formik.values.step === 0 ? 'Na plaćanje' : 'Plati'}
          </Button>
        </StyledSideContainer>
      </Slide>
    </>
  );
}
