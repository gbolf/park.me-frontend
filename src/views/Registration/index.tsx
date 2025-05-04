import React from 'react';
import { Box, Button, Fade, Slide, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { StyledSideContainer } from '../../layouts/style';
import { Link, useNavigate } from 'react-router';
import { buildLink } from '@router';
import { createGetProps, validateCurrentStep } from '@common/utils';
import { TABS } from './components/tabs';
import { getFieldsForStep, INITIAL_VALUES, validationSchema } from './validation';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from '@contexts/auth';

export function Registration() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const success = (await register({ ...values, profileImage: values.profileImage.file })) || false;
      if (success) {
        enqueueSnackbar('Registracija je uspješna');
        navigate(buildLink('login'));
      } else {
        enqueueSnackbar('Registracija nije uspješna', { variant: 'error' });
      }
      setSubmitting(false);
    },
    initialValues: INITIAL_VALUES,
    validationSchema,
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        {TABS.map((Component, idx) => (
          <Fade in={formik.values.step === idx} unmountOnExit key={idx}>
            <span>
              <Component getProps={getProps} formik={formik} />
            </span>
          </Fade>
        ))}
        <Box sx={{ mt: 'auto', zIndex: 4, position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Slide direction="right" in={formik.values.step === 0} timeout={{ enter: 500, exit: 400 }}>
            <Button component={Link} variant="text" disabled={formik.isSubmitting} to={buildLink('login')}>
              <span>
                Imate račun? <u>Prijavi se</u>
              </span>
            </Button>
          </Slide>
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
          <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
            {formik.values.step < TABS.length ? 'Dalje' : 'Kreiraj račun'}
          </Button>
        </Box>
      </form>
    </StyledSideContainer>
  );
}
