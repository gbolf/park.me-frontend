import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { StyledFormContainer } from './style';
import { StyledSideContainer } from '../../layouts/style';
import { useAuth } from '@contexts/auth';
import { useNavigate } from 'react-router';
import { buildLink } from '@router';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, submitForm, handleChange, isSubmitting } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      if (await login(values)) {
        navigate(buildLink('dashboard'));
      }
      setSubmitting(false);
    },
    initialValues: { email: '', password: '' },
  });

  return (
    <StyledSideContainer>
      <StyledFormContainer>
        <Typography variant="h1">Prijava</Typography>
        <Box>
          <TextField variant="filled" label="Email" placeholder="ivan.horvat@google.com" value={values.email} onChange={handleChange} name="email" />
          <TextField variant="filled" label="Lozinka" placeholder="********" value={values.password} onChange={handleChange} name="password" type="password" />
          <Button fullWidth variant="contained" onClick={submitForm}>
            Prijavi se
          </Button>
          <Button variant="text" disabled={isSubmitting} href={buildLink('register')}>
            <span>
              Nemate račun? <u>Registriraj se</u>
            </span>
          </Button>
        </Box>
      </StyledFormContainer>
    </StyledSideContainer>
  );
}
