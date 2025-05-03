import React from 'react';
import { alpha, Autocomplete, Box, Button, Chip, Grid, InputAdornment, ListItem, TextField, Typography } from '@mui/material';
import { createGetProps } from '@common/utils';
import { FormikProps } from 'formik';
import { PARKING_CATEGORIES } from '@common/parkingCategories';

export function GeneralInfo({ getProps, formik }: { getProps: ReturnType<typeof createGetProps>; formik: FormikProps<any> }) {
  const { error, helperText, disabled } = getProps('tags');

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Typography>Naslov</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <TextField {...getProps('title')} placeholder="Parking na otvorenom" />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Typography>Kratki opis</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <TextField {...getProps('description')} placeholder="Parking na otvorenom u samom centru grada" multiline minRows={4} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Typography>Cijena</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <TextField
          {...getProps('price')}
          placeholder="23,13"
          type="number"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">€</InputAdornment> } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Typography>Kateorije</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Autocomplete
          value={formik.values.tags}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.label}
          onChange={(_, newValues) => formik.setFieldValue('tags', newValues)}
          options={PARKING_CATEGORIES}
          multiple
          disabled={formik.isSubmitting}
          size="small"
          renderInput={(params) => <TextField error={error} disabled={disabled} {...params} helperText={helperText} />}
          noOptionsText="Nema rezultata"
          renderOption={(props, option, state) => (
            <ListItem
              {...props}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: state.selected ? alpha(option.color, 0.8) + ' !important' : alpha(option.color, 0.3),
                '&:hover': {
                  backgroundColor: alpha(option.color, 0.4),
                },
              }}
            >
              {option.icon}
              <span> {option.label}</span>
            </ListItem>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                label={option.label}
                icon={<span>{option.icon}</span>}
                sx={{
                  fontWeight: 500,
                  padding: '4px 8px',
                  backgroundColor: alpha(option.color, 0.4),
                  borderRadius: '16px',
                  '& .MuiChip-icon': {
                    marginRight: '6px',
                  },
                }}
              />
            ))
          }
          slotProps={{ listbox: { sx: { backgroundColor: '#ffffff' } } }}
        />
      </Grid>
    </Grid>
  );
}
