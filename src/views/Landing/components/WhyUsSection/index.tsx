import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledContainer, StyledGreenContainer, StyledSubContainer, StyledSubTitle, StyledSubTitle2, StyledTitle } from './style';

export function WhyUsSection() {
  return (
    <Box id="zasto-mi">
      <StyledTitle variant="h1">Zašto baš mi?</StyledTitle>
      <StyledContainer>
        <StyledSubContainer>
          <StyledSubTitle variant="h3">Štedimo vrijeme i novac</StyledSubTitle>
          <StyledSubTitle2>
            Zaboravite na skupe javne garaže s Park.me plaćate manje, a dobivate više. Naša transparentna politika cijena znači da nema skrivenih troškova.
          </StyledSubTitle2>
        </StyledSubContainer>
        <StyledGreenContainer>
          <Typography variant="h3">Eko-popusti</Typography>
          <Typography variant="h4">Popusti za električna vozila</Typography>
          <Typography>
            Vozite električni auto? <b>Park.me nagrađuje održiva vozila.</b> Ostvarite popuste na odabrane lokacije Osim što štedite novac, doprinosite
            smanjenju emisija CO<sub>2</sub> i podržavate zajednice koje ulažu u zelenu infrastrukturu. Parkirajte pametno. Vozite zeleno. <b>Uštedite više.</b>
          </Typography>
        </StyledGreenContainer>
      </StyledContainer>
    </Box>
  );
}
