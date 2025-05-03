import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import { createGetProps } from '@common/utils';
import { useMapboxSearchByCoordinates } from '@hooks/address/mutations';
import { useMapboxSearch } from '@hooks/address/queries';
import { MarkerDragEvent } from 'react-map-gl/mapbox';
import { useMapContext } from '@contexts/map';
import { FormikProps } from 'formik';
import { useDropzone } from 'react-dropzone';
import { RiUploadCloud2Line } from '@remixicon/react';
import { StyledDropZone } from './style';

function BasicInfo({ getProps }: { getProps: ReturnType<typeof createGetProps> }) {
  return (
    <Grid container spacing={1} my={3}>
      <Grid size={12} my={1}>
        <Typography variant="subtitle1">Osnovni podatci</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField {...getProps('firstName', 'Ime', 'Ivan')} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField {...getProps('lastName', 'Prezime', 'Horvat')} />
      </Grid>
      <Grid size={12}>
        <TextField {...getProps('email', 'Email', 'ivan.horvat@gmail.com')} />
      </Grid>
      <Grid size={12}>
        <TextField {...getProps('phone', 'Broj mobitela', '099 821 4830')} />
      </Grid>
    </Grid>
  );
}

function UserProfileInfo({ getProps }: { getProps: ReturnType<typeof createGetProps> }) {
  return (
    <Grid container spacing={1} my={3}>
      <Grid size={12} my={1}>
        <Typography variant="subtitle1">Postavljanje profil</Typography>
      </Grid>
      <Grid size={12}>
        <TextField {...getProps('username', 'Korisničko ime', 'ivan.horvat123')} />
      </Grid>
      <Grid size={12}>
        <TextField {...getProps('password', 'Lozinka', '*******')} type="password" />
      </Grid>
      <Grid size={12}>
        <TextField {...getProps('passwordConfirm', 'Potvrda lozinke', '*******')} type="password" />
      </Grid>
    </Grid>
  );
}

function AddressInfo({ getProps, formik }: { formik: FormikProps<any>; getProps: ReturnType<typeof createGetProps> }) {
  const [addressQuery, setAddressQuery] = useState('');
  const { setMapPostion, setMarkerPositions } = useMapContext();

  const useMapboxSearchByCoordinatesMutation = useMapboxSearchByCoordinates();
  const mapboxSearchQuery = useMapboxSearch(formik.values.address?.fullAddress !== addressQuery && addressQuery);
  const loadingAddress = mapboxSearchQuery.isPending || mapboxSearchQuery.isFetching || mapboxSearchQuery.isLoading;

  const onMarkerMove = (e: MarkerDragEvent) => {
    useMapboxSearchByCoordinatesMutation.mutate(
      { latitude: e.lngLat.lat, longitude: e.lngLat.lng },
      { onSuccess: (newAddres) => formik.setFieldValue('address', newAddres[0]) }
    );
  };

  useEffect(() => {
    if (formik.values.address) {
      setMapPostion({
        longitude: formik.values.address.coordinates[0],
        latitude: formik.values.address.coordinates[1],
      });
      setMarkerPositions([
        {
          longitude: formik.values.address.coordinates[0],
          latitude: formik.values.address.coordinates[1],
          onDragEnd: onMarkerMove,
        },
      ]);
    }
  }, [formik.values.address]);

  return (
    <Grid container spacing={1} my={3}>
      <Grid size={12} mb={1}>
        <Typography variant="subtitle1">Adresa stanovanje</Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="subtitle2">Unesite dio adrese</Typography>
      </Grid>
      <Grid size={12}>
        <Autocomplete
          options={mapboxSearchQuery.data}
          loading={loadingAddress}
          getOptionLabel={(option) => option.fullAddress}
          value={formik.values.address}
          disableClearable
          onChange={(_, value) => formik.setFieldValue('address', value)}
          fullWidth
          loadingText="Učitavanje"
          size="small"
          noOptionsText="Lokacija nije pronađena"
          onInputChange={(_, value) => setAddressQuery(value)}
          inputValue={addressQuery}
          slotProps={(!addressQuery || loadingAddress) && { paper: { sx: { '& .MuiAutocomplete-noOptions': { display: 'none' } } } }}
          renderInput={(props) => <TextField {...props} label="Adresa" placeholder="Ilica 2" />}
        />
      </Grid>
      <Grid size={12}>
        <Typography variant="subtitle2">ili ručno ispunite sva polja</Typography>
      </Grid>
      <Grid size={9}>
        <TextField {...getProps('address.street', 'Ulica')} />
      </Grid>
      <Grid size={3}>
        <TextField {...getProps('address.houseNumber', 'Kućni broj')} />
      </Grid>
      <Grid size={4}>
        <TextField {...getProps('address.postCode', 'Poštanski broj')} />
      </Grid>
      <Grid size={8}>
        <TextField {...getProps('address.place', 'Mjesto')} />
      </Grid>
    </Grid>
  );
}

function ImageUpload({ formik }: { formik: FormikProps<any> }) {
  const onDrop = ([file]: File[]) => {
    formik.setFieldValue('profileImage.file', file);
    formik.setFieldValue('profileImage.URL', URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, disabled: formik.values.step != 3 });

  return (
    <Grid container spacing={1} my={3} sx={{ height: '100%' }}>
      <Grid size={12} mb={1}>
        <Typography variant="subtitle1">Profilna slika</Typography>
      </Grid>
      <Grid size={12} sx={{ height: '100%', cursor: 'pointer' }}>
        <StyledDropZone {...getRootProps()} imageURL={formik.values.profileImage.URL}>
          <input {...getInputProps()} />
          <RiUploadCloud2Line size={50} />
          <Typography> {isDragActive ? 'Pusti sliku ovdje...' : 'Klikni ili povuci sliku za dodavanje profilne fotografije'}</Typography>
        </StyledDropZone>
        <Typography variant="caption">* Nije obavezno</Typography>
      </Grid>
    </Grid>
  );
}

export const TABS = [BasicInfo, UserProfileInfo, AddressInfo, ImageUpload] as const;
