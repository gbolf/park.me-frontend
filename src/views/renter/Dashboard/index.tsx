import React, { useState } from 'react';
import { Avatar, Box, Button, Menu, Typography, MenuItem, Grid, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { StyledCard, StyledCardContent, StyledCardMedia, StyledSideContainer } from './style';
import { useAuth } from '@contexts/auth';
import { RiAddLine, RiLogoutBoxRLine } from '@remixicon/react';
import { buildLink } from '@router';
import { useMyParkings } from '../../../hooks/parking/queries';
import { BASE_GLASS_STYLE } from '../../../components/style';

export function DashboardRenter() {
  const [dropDownNode, setDropDownNode] = useState(null);
  const { user, logout } = useAuth();

  const myParkingsQuery = useMyParkings();
  const myParkings = myParkingsQuery.data;

  return (
    <StyledSideContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
        <Typography>Park.me</Typography>
        <Button
          onClick={(e) => setDropDownNode(e.currentTarget)}
          variant="outlined"
          size="small"
          sx={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 10px' }}
        >
          <Avatar alt={user.name} sx={{ width: '30px', height: '30px' }} />
          <Typography>{user.name}</Typography>
        </Button>
      </Box>
      <Menu open={!!dropDownNode} anchorEl={dropDownNode} onClose={() => setDropDownNode(null)}>
        <MenuItem sx={{ paddingTop: 0, width: dropDownNode?.offsetWidth }}>
          <Button endIcon={<RiLogoutBoxRLine />} onClick={logout}>
            Odjava
          </Button>
        </MenuItem>
      </Menu>
      <Typography variant="h1">Dobro došao, {user.name}!</Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3">Vaši oglasi</Typography>
            <Button variant="contained" size="small" endIcon={<RiAddLine />} href={buildLink('rentPlace')}>
              Dodaj oglas
            </Button>
          </Box>
        </Grid>
        <Grid container spacing={2} size={12}>
          {myParkings.map(({ images, title, id }) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={id}>
              <StyledCard>
                <CardActionArea sx={{ height: '100%' }} href={buildLink('parkingOverview', { parkingId: id })}>
                  <StyledCardMedia image={images?.[0] || '/placeholder.jpg'} />
                  <StyledCardContent>
                    <Typography variant="caption" fontWeight="bold" noWrap title={title}>
                      {title}
                    </Typography>
                  </StyledCardContent>
                </CardActionArea>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </StyledSideContainer>
  );
}
