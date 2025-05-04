import React from 'react';
import { Box, Button, Typography, Grid, CardActionArea } from '@mui/material';
import { StyledCard, StyledCardContent, StyledCardMedia, StyledSideContainer } from './style';
import { useAuth } from '@contexts/auth';
import { RiAddLine } from '@remixicon/react';
import { buildLink } from '@router';
import { useBookedParkings, useMyParkings } from '../../../hooks/parking/queries';
import { Link } from 'react-router';

export function DashboardRenter() {
  const { user } = useAuth();

  const myParkingsQuery = useMyParkings();
  const myParkings = myParkingsQuery.data;

  const bookedParkingsQuery = useBookedParkings();
  const bookedParkings = bookedParkingsQuery.data;

  return (
    <StyledSideContainer>
      <Typography variant="h1" mt={1} mb={3}>
        Pozdrav, {user.firstName}!
      </Typography>
      <Grid container spacing={4}>
        <Grid container spacing={2} size={12}>
          <Grid size={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h3">Vaši oglasi</Typography>
              <Link to={buildLink('rentPlace')}>
                <Button variant="contained" size="small" endIcon={<RiAddLine />}>
                  Dodaj oglas
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid container spacing={3} size={12}>
            {myParkings.map(({ images, title, id }) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={id}>
                <StyledCard>
                  <Link to={buildLink('parkingOverview', { parkingId: id })}>
                    <CardActionArea sx={{ height: '100%' }}>
                      <StyledCardMedia image={images?.[0] || '/placeholder.jpg'} />
                      <StyledCardContent>
                        <Typography variant="caption" fontWeight="bold" noWrap title={title}>
                          {title}
                        </Typography>
                      </StyledCardContent>
                    </CardActionArea>
                  </Link>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={2} size={12}>
          <Grid size={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h3">Vaše rezervacije</Typography>
              <Link to={buildLink('parkinglist')}>
                <Button variant="contained" size="small" endIcon={<RiAddLine />}>
                  Rezerviraj
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid container spacing={3} size={12}>
            {bookedParkings.map(({ images, title, id }) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={id}>
                <StyledCard>
                  <Link to={buildLink('parkingOverview', { parkingId: id })}>
                    <CardActionArea sx={{ height: '100%' }}>
                      <StyledCardMedia image={images?.[0] || '/placeholder.jpg'} />
                      <StyledCardContent>
                        <Typography variant="caption" fontWeight="bold" noWrap title={title}>
                          {title}
                        </Typography>
                      </StyledCardContent>
                    </CardActionArea>
                  </Link>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </StyledSideContainer>
  );
}
