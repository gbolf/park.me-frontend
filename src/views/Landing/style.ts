import { Box, styled } from '@mui/system';
import { List, listItemClasses, Typography, typographyClasses } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

export const StyledMainContainer = styled(Box)(({ theme }) => ({
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '200px',
  [theme.breakpoints.down('md')]: {
    gap: '100px',
  },
}));

export const StyledList = styled(List)(({ theme }) => ({
  position: 'fixed',
  top: 15,
  left: 14,
  width: 'calc(100% - 30px)',
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'Nunito Sans',
  fontWeight: '800',
  padding: 0,
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    gap: '10px',
    top: 10,
    left: 10,
  },
  [`& .${listItemClasses.root}`]: {
    width: 'max-content',
    borderRadius: '15px',
    border: '2px solid #EDF1D5',
    background: '#3F523B',
    boxShadow: '0px 0px 20px 3px rgba(63, 82, 59, 0.20)',
    color: '#FFFFFF',
  },
}));

export const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#3F523B',
  fontFamily: 'Montagu Slab',
  fontSize: '80px',
  fontWeight: 800,
  [theme.breakpoints.down('md')]: {
    fontSize: '50px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '35px',
  },
}));

export const StyledFooter = styled(Box)<{ component: React.ElementType }>(({ theme }) => ({
  backgroundColor: '#3F523B',
  padding: '30px',
  paddingBottom: '20px',
  borderRadius: 30,
  [theme.breakpoints.down('md')]: {
    padding: '20px',
  },
  [`& .${typographyClasses.root}:first-of-type`]: {
    fontFamily: 'Nunito Sans',
    fontSize: '50px',
    fontWeight: 900,
    color: '#FFFFFF',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
  },
  [`& .${listItemClasses.root}`]: {
    fontFamily: 'Nunito Sans',
    fontSize: '15px',
    fontWeight: 900,
    color: '#FFFFFF',
    width: 'max-content',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
}));
