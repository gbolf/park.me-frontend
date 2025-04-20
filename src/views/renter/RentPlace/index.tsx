import React, { useRef, useState } from 'react';
import { StyledImage, StyledSideContainer } from './style';
import { alpha, Autocomplete, Box, Button, Chip, Grid, InputAdornment, ListItem, TextField, Typography } from '@mui/material';
import carImg from '@images/car.jpg';
import { Gallery } from '../../client/ParkingDetailsView/components/Galery';
import { PARKING_CATEGORIES } from '@common/parkingCategories';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { buildLink } from '@router';
import { createParking } from '../../../hooks/parking/mutations';

export function RenterRentPlace() {
  const galeryRef = useRef<{ scrollToImage: (pos: number) => void; active: number }>(null);
  const [images, setImages] = useState([carImg, carImg, carImg]);
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const createParkingMutation = createParking();

  const { values, setFieldValue, submitForm, handleChange, isSubmitting } = useFormik<{
    categories: ParkingCategories;
    name: string;
    description: string;
    price: number;
  }>({
    initialValues: { categories: [] as ParkingCategories, name: '', description: '', price: null },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      createParkingMutation.mutate(values, {
        onSuccess: () => navigate(buildLink('parkingOverview', { parkingId: 12451 })),
        onSettled: () => setSubmitting(false),
      });
    },
  });

  return (
    <StyledSideContainer>
      <Typography variant="h2" sx={{ gridColumn: 'span 2', textAlign: 'center' }}>
        O parkirnom mjestu
      </Typography>
      <Box sx={{ width: '90%' }}>
        <Gallery onChange={(idx) => setActiveImage(idx)} images={images} sx={{ '& img': { maxHeight: 500 } }} ref={galeryRef} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {images.map((src, idx) => (
            <Button disableRipple onClick={() => galeryRef.current.scrollToImage(idx)}>
              <StyledImage src={src} active={activeImage === idx} />
            </Button>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Grid container spacing="30px">
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography>Naziv</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <TextField fullWidth value={values.name} disabled={isSubmitting} onChange={handleChange} name="name" size="small" />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography>Kratki opis</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <TextField
              fullWidth
              value={values.description}
              disabled={isSubmitting}
              onChange={handleChange}
              name="description"
              size="small"
              placeholder="#TODO"
              multiline
              minRows={4}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography>Cijena</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <TextField
              fullWidth
              value={values.price}
              onChange={handleChange}
              disabled={isSubmitting}
              name="price"
              size="small"
              placeholder="23,13"
              type="number"
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography>Kateorije</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Autocomplete
              value={values.categories}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.label}
              onChange={(_, newValues) => setFieldValue('categories', newValues)}
              options={PARKING_CATEGORIES}
              multiple
              disabled={isSubmitting}
              size="small"
              renderInput={(params) => <TextField {...params} helperText="Odaberite minimalno 3 kategorije" />}
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
              slotProps={{
                listbox: {
                  sx: {
                    backgroundColor: '#ffffff',
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={submitForm} disabled={isSubmitting}>
          Predaj oglas
        </Button>
      </Box>
    </StyledSideContainer>
  );
}
