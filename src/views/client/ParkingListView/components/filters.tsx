import React, { useState } from 'react';
import { Accordion, Typography, AccordionDetails, AccordionSummary, Grid, TextField, Autocomplete, MenuItem } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useMapboxSearch } from '@hooks/address/queries';
import { MEASUREMENT_UNITS } from '@common/constants';

type FilterProps = {
  filters: ParkingFilters;
  setFilters: React.Dispatch<React.SetStateAction<ParkingFilters>>;
  expanded: boolean;
  onChange: () => void;
};

export function DateFilter({ filters, setFilters, expanded, onChange }: FilterProps) {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary>Dostupnost</AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle2">Početak</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>
            <DatePicker
              value={filters.startDate}
              slotProps={{ textField: { size: 'small', fullWidth: true, label: 'Datum početka' } }}
              onChange={(value) => {
                setFilters((old) => ({ ...old, startDate: value }));
                if (value.isAfter(filters.endDate)) {
                  setFilters((old) => ({ ...old, endDate: null }));
                }
              }}
              disablePast
            />
          </Grid>
          <Grid size={12}>
            <TimePicker
              ampm={false}
              views={['hours']}
              value={filters.startDate}
              slotProps={{ textField: { size: 'small', fullWidth: true, label: 'Vrijeme početka' } }}
              onChange={(time) => {
                const updated = dayjs(filters.startDate).hour(time.hour()).minute(time.minute());
                setFilters((old) => ({ ...old, startDate: updated }));
                if (updated.isAfter(filters.endDate)) {
                  setFilters((old) => ({ ...old, endDate: null }));
                }
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="subtitle2" mt={3}>
          Završetak
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>
            <DatePicker
              value={filters.startDate}
              slotProps={{ textField: { size: 'small', fullWidth: true, label: 'Datum završetka' } }}
              shouldDisableDate={(date) => date.isBefore(filters.startDate, 'day')}
              onChange={(value) => setFilters((old) => ({ ...old, endDate: value }))}
              disablePast
            />
          </Grid>
          <Grid size={12}>
            <TimePicker
              ampm={false}
              views={['hours']}
              value={filters.startDate}
              slotProps={{ textField: { size: 'small', fullWidth: true, label: 'Vrijeme završetka' } }}
              onChange={(time) => {
                const updated = dayjs(filters.endDate).hour(time.hour()).minute(time.minute());
                setFilters((old) => ({ ...old, endDate: updated }));
                if (updated.isBefore(filters.startDate)) {
                  setFilters((old) => ({ ...old, startDate: updated.subtract(1, 'hour') }));
                }
              }}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export function LocationFilter({ filters, setFilters, expanded, onChange }: FilterProps) {
  const [addressQuery, setAddressQuery] = useState('');

  const mapboxSearchQuery = useMapboxSearch(filters.address?.fullAddress !== addressQuery && addressQuery);
  const loadingAddress = mapboxSearchQuery.isPending || mapboxSearchQuery.isFetching || mapboxSearchQuery.isLoading;

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary>Lokacija</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Typography variant="subtitle2">Unesite dio adrese</Typography>
          </Grid>
          <Grid size={12}>
            <Autocomplete
              options={mapboxSearchQuery.data}
              loading={loadingAddress}
              getOptionLabel={(option) => option.fullAddress}
              value={filters.address}
              disableClearable
              onChange={(_, value) => setFilters((old) => ({ ...old, address: value }))}
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
          <Grid size={12} my={1}>
            <Typography variant="subtitle2">ili ručno ispunite sva polja</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              value={filters.address.street}
              onChange={(e) => setFilters((old) => ({ ...old, address: { ...old.address, street: e.target.value } }))}
              label="Ulica"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              value={filters.address.houseNumber}
              onChange={(e) => setFilters((old) => ({ ...old, address: { ...old.address, houseNumber: e.target.value } }))}
              label="Kućni broj"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              value={filters.address.postCode}
              onChange={(e) => setFilters((old) => ({ ...old, address: { ...old.address, postCode: e.target.value } }))}
              label="Poštanski broj"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              value={filters.address.place}
              onChange={(e) => setFilters((old) => ({ ...old, address: { ...old.address, place: e.target.value } }))}
              label="Mjesto"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={8}>
            <TextField
              value={filters.disatance.value}
              onChange={(e) => setFilters((old) => ({ ...old, disatance: { ...old.disatance, value: Number(e.target.value) } }))}
              label="Udaljenost"
              size="small"
              fullWidth
              type="number"
            />
          </Grid>
          <Grid size={4}>
            <TextField
              select
              value={filters.disatance.unit}
              onChange={(e) => setFilters((old) => ({ ...old, disatance: { ...old.disatance, unit: e.target.value as (typeof MEASUREMENT_UNITS)[number] } }))}
              label="Select"
              size="small"
              fullWidth
            >
              {MEASUREMENT_UNITS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export const FILTERS = [DateFilter, LocationFilter];
