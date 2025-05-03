import React from 'react';
import { Avatar, Grid, TextField, Typography } from '@mui/material';
import { useAuth } from '@contexts/auth';
import { StyledContainer } from './style';
import { useFormik } from 'formik';
import { createGetProps } from '@common/utils';

export function Profile() {
  const { user } = useAuth();

  const formik = useFormik({ initialValues: { ...user }, enableReinitialize: true, onSubmit: () => {} });
  const getProps = createGetProps(formik);

  return (
    <StyledContainer>
      <Typography variant="h2">Vaš profil</Typography>
      <Grid container spacing={3} mt={3}>
        <Grid size={12}>
          <Avatar src={user.profileImage} sx={{ height: 100, width: 100 }} />
        </Grid>
        <Grid container spacing={2} size={12}>
          <Grid size={12} mb={1}>
            <Typography variant="subtitle1">Osobni podatci</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Ime</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField {...getProps('name')} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Prezime</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField {...getProps('name')} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Email adresa</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField {...getProps('email')} />
          </Grid>
        </Grid>
        <Grid container spacing={2} size={12}>
          <Grid size={12} mb={1}>
            <Typography variant="subtitle1">Adresa</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Ime</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField {...getProps('name')} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Prezime</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField {...getProps('name')} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2">Email adresa</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField {...getProps('email')} />
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
