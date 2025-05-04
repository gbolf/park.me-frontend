import React, { ReactNode, useEffect, useState } from 'react';
import { StyledAppbarContainer, StyledAvatarContainer, StyledDrawer, StyledNavigationContainer } from './style';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAuth } from '@contexts/auth';
import { RiLogoutBoxRLine, RiMenuLine, RiUserLine } from '@remixicon/react';
import logo from '@images/logo-full.svg';
import { Link } from 'react-router';
import { buildLink } from '@components/Router';
import { useMapContext } from '@contexts/map';
export function NavigationLayout({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dropDownNode, setDropDownNode] = useState(null);
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const LINKS = [
    { url: buildLink('parkinglist'), title: 'Pregled svih mjesta' },
    { url: buildLink('dashboard'), title: 'Nadzorna ploča' },
  ];

  const { setIsActive } = useMapContext();
  useEffect(() => {
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  return (
    <StyledNavigationContainer>
      <StyledAppbarContainer>
        <img src={logo} height="20" alt="Park.me logo" />
        {!isDownMd ? (
          <>
            <List>
              {LINKS.map((link) => (
                <ListItem>
                  <Link to={link.url}>
                    <Typography>{link.title}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
            <StyledAvatarContainer onClick={(e) => setDropDownNode(e.currentTarget)} size="small">
              <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
              <Avatar src={user.profileImage} />
            </StyledAvatarContainer>
          </>
        ) : (
          <>
            <StyledDrawer
              transitionDuration={300}
              open={isDrawerOpen}
              onOpen={() => setIsDrawerOpen(true)}
              onClose={() => setIsDrawerOpen(false)}
              anchor="left"
            >
              <Box ml="50px" mt="40px" mb={2}>
                <img src={logo} height="20" alt="Park.me logo" />
              </Box>
              <List>
                {LINKS.map((link) => (
                  <ListItem>
                    <Link to={link.url} onClick={() => setIsDrawerOpen(false)}>
                      <Typography variant="subtitle2">{link.title}</Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </StyledDrawer>
            <IconButton onClick={() => setIsDrawerOpen((old) => !old)}>
              <RiMenuLine />
            </IconButton>
          </>
        )}
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
