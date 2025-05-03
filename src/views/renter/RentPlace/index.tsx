import React from 'react';
import { Button, Grid, Slide } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { buildLink } from '@router';
import { createParking } from '../../../hooks/parking/mutations';
import { getFieldsForStep, INITIAL_VALUES, validationSchema } from './validations';
import { createGetProps, validateCurrentStep } from '@common/utils';
import { GeneralTab } from './components/general';
import { StyledSideContainer } from './style';
import { AddressTab } from './components/address';
import { StyledBaseGlassBox } from '@components/style';

export function RenterRentPlace() {
  const navigate = useNavigate();
  const createParkingMutation = createParking();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      createParkingMutation.mutate(values, {
        onSuccess: () => navigate(buildLink('parkingOverview', { parkingId: 12451 })),
        onSettled: () => setSubmitting(false),
      });
    },
    validationSchema,
  });

  const handleNext = async () => {
    if (formik.values.step === 1) {
      return formik.submitForm();
    }
    if (await validateCurrentStep(formik, getFieldsForStep)) {
      formik.setFieldValue('step', formik.values.step + 1);
    }
  };

  const getProps = createGetProps(formik);

  const ActionButton = (
    <Button variant="contained" sx={{ mt: 'auto' }} key="action-button" fullWidth onClick={handleNext} disabled={formik.isSubmitting}>
      {formik.values.step === 0 ? 'Dalje' : 'Kreiraj oglas'}{' '}
    </Button>
  );

  return (
    <>
      <StyledSideContainer sx={{ transition: 'width 300ms', width: formik.values.step === 0 ? '100%' : 'min(100%, 800px)' }}>
        {formik.values.step === 0 ? (
          <GeneralTab formik={formik} getProps={getProps} ActionButton={ActionButton} />
        ) : (
          <AddressTab formik={formik} getProps={getProps} ActionButton={ActionButton} />
        )}
      </StyledSideContainer>
      <Slide direction="up" in={formik.values.step === 1} unmountOnExit>
        <StyledBaseGlassBox sx={{ height: 'max-content' }} key="actions">
          {ActionButton}
        </StyledBaseGlassBox>
      </Slide>
    </>
  );
}
