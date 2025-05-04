import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { StyledFormContainer } from './style';
import { StyledSideContainer } from '../../layouts/style';
import { useAuth } from '@contexts/auth';
import { Link, useNavigate } from 'react-router';
import { buildLink } from '@router';
import { createGetProps } from '@common/utils';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      if (await login(values)) {
        navigate(buildLink('dashboard'));
      }
      setSubmitting(false);
    },
    initialValues: { email: '', password: '' },
  });
  const getProps = createGetProps(formik);

  return (
    <StyledSideContainer>
      <StyledFormContainer>
        <Typography variant="h1">Prijava</Typography>
        <Box>
          <TextField {...getProps('email', 'Email')} placeholder="ivan.horvat@google.com" />
          <TextField {...getProps('password', 'Lozinka')} placeholder="********" type="password" />
          <Button fullWidth variant="contained" onClick={formik.submitForm}>
            Prijavi se
          </Button>
          <Button component={Link} variant="text" disabled={formik.isSubmitting} to={buildLink('register')}>
            <span>
              Nemate račun? <u>Registriraj se</u>
            </span>
          </Button>
        </Box>
      </StyledFormContainer>
    </StyledSideContainer>
  );
}
