import React, { useState } from 'react';
import { Avatar, Box, Button, Menu, Typography, MenuItem, Grid } from '@mui/material';
import { StyledSideContainer } from './style';
import { useAuth } from '../../../contexts/auth';
import { RiLogoutBoxRLine } from '@remixicon/react';

export function Dashboard() {
  const [dropDownNode, setDropDownNode] = useState(null);
  const { user, logout } = useAuth();

  return (
    <StyledSideContainer key="main-container">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
        <Typography>Park.me</Typography>
        <Button
          onClick={(e) => setDropDownNode(e.currentTarget)}
          variant="outlined"
          size="small"
          sx={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 10px' }}
        >
          <Avatar alt={user.firstName} sx={{ width: '30px', height: '30px' }} />
          <Typography>{user.firstName}</Typography>
        </Button>
      </Box>
      <Menu open={!!dropDownNode} anchorEl={dropDownNode} onClose={() => setDropDownNode(null)}>
        <MenuItem sx={{ paddingTop: 0, width: dropDownNode?.offsetWidth }}>
          <Button endIcon={<RiLogoutBoxRLine />} onClick={logout}>
            Odjava
          </Button>
        </MenuItem>
      </Menu>
      <Typography variant="h1">Dobro došao, {user.firstName}!</Typography>
      <Typography variant="h2" sx={{ mt: '40px' }}>
        Vaše rezervacije
      </Typography>
    </StyledSideContainer>
  );
}
