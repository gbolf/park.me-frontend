import React, { useState, useEffect } from 'react';
import { createGetProps } from '@common/utils';
import { INITIAL_VALUES } from '../validations';
import { FormikProps } from 'formik';
import { Autocomplete, TextField, Typography, Grid, Slide } from '@mui/material';
import { useMapContext } from '@contexts/map';
import { useMapboxSearchByCoordinates } from '@hooks/address/mutations';
import { useMapboxSearch } from '@hooks/address/queries';
import { MarkerDragEvent } from 'react-map-gl/mapbox';
import { StyledSideContainer } from '../style';

export function AddressTab({
  formik,
  getProps,
  ActionButton,
}: {
  ActionButton: React.ReactNode;
  getProps: ReturnType<typeof createGetProps>;
  formik: FormikProps<typeof INITIAL_VALUES>;
}) {
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
    <>
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        Podatci o lokaciji
      </Typography>
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
            noOptionsText="Lokacija nije pronađena"
            onInputChange={(_, value) => setAddressQuery(value)}
            inputValue={addressQuery}
            size="small"
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
    </>
  );
}
