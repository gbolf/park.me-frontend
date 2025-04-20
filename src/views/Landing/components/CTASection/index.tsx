import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledSectionTitle } from '../../style';
import { StyledContainer } from './style';

export function CTASection() {
  return (
    <Box>
      <StyledSectionTitle variant="h2">Umoran si od beskrajnog traženja parkinga?</StyledSectionTitle>
      <StyledContainer>
        <Box>
          <Typography>Vrijeme je za Park.Me - inovativnu platformu koja povezuje one koji traže parking s onima koji ga iznajmljuju!</Typography>
        </Box>
      </StyledContainer>
    </Box>
  );
}
