import React from 'react';
import { Box, Button, Fade, Slide, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { StyledSideContainer } from '../../layouts/style';
import { useNavigate } from 'react-router';
import { buildLink } from '@router';
import { createGetProps, validateCurrentStep } from '@common/utils';
import { TABS } from './components/tabs';
import { getFieldsForStep, INITIAL_VALUES, validationSchema } from './validation';
import { enqueueSnackbar } from 'notistack';

export function Registration() {
  const navigate = useNavigate();

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      enqueueSnackbar('Registracija je uspješna');
      navigate(buildLink('login'));
      setSubmitting(false);
    },
    initialValues: INITIAL_VALUES,
    validationSchema: validationSchema,
  });

  const handleNext = async () => {
    if (formik.values.step === TABS.length - 1) {
      return formik.submitForm();
    }
    if (await validateCurrentStep(formik, getFieldsForStep)) {
      formik.setFieldValue('step', formik.values.step + 1);
    }
  };

  const getProps = createGetProps(formik);

  return (
    <StyledSideContainer>
      <Typography variant="h1" textAlign="center" mt={2}>
        Registracija
      </Typography>
      {TABS.map((Component, idx) => (
        <Fade in={formik.values.step === idx} unmountOnExit timeout={{ exit: 0, enter: 600 }} key={idx}>
          <span>
            <Component getProps={getProps} formik={formik} />
          </span>
        </Fade>
      ))}
      <Box sx={{ mt: 'auto', zIndex: 4, position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Slide direction="right" in={formik.values.step > 0} timeout={{ enter: 500, exit: 400 }}>
          <Button
            variant="text"
            sx={{ width: 0, overflow: 'hidden' }}
            disabled={formik.values.step === 0 || formik.isSubmitting}
            onClick={() => formik.setFieldValue('step', formik.values.step - 1)}
          >
            Natrag
          </Button>
        </Slide>
        <Button variant="contained" onClick={handleNext} disabled={formik.isSubmitting}>
          {formik.values.step < TABS.length ? 'Dalje' : 'Kreiraj račun'}
        </Button>
      </Box>
    </StyledSideContainer>
  );
}
