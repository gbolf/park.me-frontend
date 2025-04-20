import React from 'react';
import { Typography, ListItem, List } from '@mui/material';
import { StyledFooter, StyledList, StyledMainContainer } from './style';
import { HeroSection } from './components/HeroSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ProcessSection } from './components/ProcessSection';
import { ReviewSection } from './components/ReviewSection';
import { CTASection } from './components/CTASection';
import logoImg from '@images/logo.svg';

export function Landing() {
  return (
    <StyledMainContainer>
      <StyledList>
        <ListItem sx={{ gap: '10px', alignItems: 'center' }}>
          <img src={logoImg} height="20px" />
          <span> Park.me</span>
        </ListItem>
        <ListItem component="a" href="/login">
          Prijava
        </ListItem>
      </StyledList>
      <HeroSection />
      <WhyUsSection />
      <ProcessSection />
      <ReviewSection />
      <CTASection />
      <StyledFooter component="footer">
        <Typography>Park.me</Typography>
        <List>
          <ListItem>Kontakt: info@park.me</ListItem>
          <ListItem>Telefon: +385 1 161 4319</ListItem>
          <ListItem>© {new Date().getFullYear()} Park.me</ListItem>
        </List>
      </StyledFooter>
    </StyledMainContainer>
  );
}
