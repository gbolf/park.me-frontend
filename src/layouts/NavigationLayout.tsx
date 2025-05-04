import React, { ReactNode, useEffect, useState } from 'react';
import { StyledAppbarContainer, StyledAvatarContainer, StyledNavigationContainer } from './style';
import { Avatar, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useAuth } from '@contexts/auth';
import { RiLogoutBoxRLine, RiProfileLine, RiUserLine } from '@remixicon/react';
import logo from '@images/logo-full.svg';
import { Link } from 'react-router';
import { buildLink } from '@components/Router';
import { useMapContext } from '@contexts/map';

export function NavigationLayout({ children }: { children: ReactNode }) {
  const [dropDownNode, setDropDownNode] = useState(null);
  const { user, logout } = useAuth();

  const { setIsActive } = useMapContext();
  useEffect(() => {
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  return (
    <StyledNavigationContainer>
      <StyledAppbarContainer>
        <img src={logo} height="20" alt="Park.me logo" />
        <List>
          <ListItem>
            <Link to={buildLink('landing')}>
              <Typography>Naslovnica</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link to={buildLink('parkinglist')}>
              <Typography>Pregled svih mjesta</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link to={buildLink('dashboard')}>
              <Typography>Nadzorna ploča</Typography>
            </Link>
          </ListItem>
        </List>
        <StyledAvatarContainer onClick={(e) => setDropDownNode(e.currentTarget)} size="small">
          <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
          <Avatar src={user.profileImage} />
        </StyledAvatarContainer>
      </StyledAppbarContainer>
      <Menu open={!!dropDownNode} anchorEl={dropDownNode} onClose={() => setDropDownNode(null)}>
        <MenuItem component={Link} to={buildLink('me')}>
          <ListItemIcon>
            <RiUserLine />
          </ListItemIcon>
          <ListItemText>Moj profil</ListItemText>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <RiLogoutBoxRLine />
          </ListItemIcon>
          <ListItemText>Odjava</ListItemText>
        </MenuItem>
      </Menu>
      {children}
    </StyledNavigationContainer>
  );
}
